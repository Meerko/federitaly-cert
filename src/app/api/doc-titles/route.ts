// src/app/api/doc-titles/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const Schema = z.object({
  companyId: z.string().min(3),
  language: z.enum(["it", "en"]).default("it"),
  files: z
    .array(
      z.object({
        url: z.string().url(),
        filename: z.string().min(1),
      })
    )
    .min(1)
    .max(10),
});

function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

async function callOpenAIForOrderedTitles(
  model: string,
  files: Array<{ url: string; filename: string }>,
  language: "it" | "en"
): Promise<string[]> {
  const content: any[] = [];

  content.push({
    type: "input_text",
    text: `
Genera SOLO titoli brevi (max 6 parole) in ${language === "it" ? "italiano" : "inglese"}.
Devi restituire un titolo per ogni PDF seguendo ESATTAMENTE l’ordine dei file forniti.

Vincoli:
- tono istituzionale e neutro
- non inventare informazioni non presenti nei documenti
- se un PDF non è leggibile, usa "Documento allegato"

Output: JSON nel formato:
{
  "titles": ["...", "...", "..."]
}
(dove titles ha la stessa lunghezza dei file)
`.trim(),
  });

  content.push({
    type: "input_text",
    text: `Elenco file in ordine:\n${files.map((f, i) => `${i + 1}. ${f.filename} | ${f.url}`).join("\n")}`,
  });

  // Passa i PDF come file_url
  files.forEach((f) => {
    content.push({
      type: "input_file",
      file_url: f.url,
    });
  });

  const payload = {
    model,
    input: [{ role: "user", content }],
    max_output_tokens: 600,

    // ✅ NUOVO: structured output via text.format (Responses API)
    text: {
      format: {
        type: "json_schema",
        name: "ordered_titles",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            titles: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["titles"],
        },
      },
    },
  };

  const resp = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const raw = await resp.text();

  if (!resp.ok) {
    throw new Error(`OpenAI ${resp.status}: ${raw.slice(0, 700)}`);
  }

  const json = JSON.parse(raw);

  // In Responses API spesso trovi il testo in output_text
  const out =
    json.output_text ??
    json?.output?.[0]?.content?.[0]?.text ??
    "";

  const parsed = JSON.parse(String(out));
  const titles = Array.isArray(parsed?.titles)
    ? parsed.titles.map((t: any) => String(t).trim())
    : [];

  // Garantiamo stessa lunghezza
  return files.map((_, i) => (titles[i] || "Documento allegato").slice(0, 120));
}

export async function POST(req: Request) {
  let step = "start";

  try {
    step = "parse_body";
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    step = "validate";
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation error", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { companyId, files, language } = parsed.data;
    console.log("[doc-titles] companyId:", companyId, "files:", files.length);

    // 1) Cache read
    step = "supabase_read";
    const { data: cachedRows, error: readErr } = await supabaseAdmin
      .from("company_ai_content")
      .select("source_key, ai_output")
      .eq("company_id", companyId)
      .eq("content_type", "document_title")
      .in("source_key", files.map((f) => f.url));

    if (readErr) {
      return NextResponse.json(
        { error: "Supabase read failed", step, details: readErr.message },
        { status: 500 }
      );
    }

    const cachedMap = new Map<string, string>();
    (cachedRows ?? []).forEach((r: any) => {
      if (r.source_key && r.ai_output) cachedMap.set(r.source_key, r.ai_output);
    });

    const missing = files.filter((f) => !cachedMap.has(f.url));
    console.log("[doc-titles] cached:", cachedMap.size, "missing:", missing.length);

    if (missing.length === 0) {
      return NextResponse.json({
        cached: true,
        titles: Object.fromEntries(files.map((f) => [f.url, cachedMap.get(f.url)])),
      });
    }

    // 2) OpenAI call (solo sui missing)
    step = "openai_call";
    const MODEL_FOR_PDF = "gpt-4o"; // più robusto del mini per PDF

    const orderedTitles = await callOpenAIForOrderedTitles(MODEL_FOR_PDF, missing, language);

    // map titles back to urls in same order
    const titleMap: Record<string, string> = {};
    missing.forEach((f, i) => (titleMap[f.url] = orderedTitles[i] || "Documento allegato"));

    // 3) Upsert
    step = "supabase_write";
    const toUpsert = missing.map((f) => {
      const title = (titleMap[f.url] || "Documento allegato").trim().slice(0, 120);

      return {
        company_id: companyId,
        language,
        content_type: "document_title",
        source_key: f.url,
        source_value: f.filename,
        source_hash: sha256(`${f.url}|${f.filename}|${title}`),
        original_text: f.filename,
        ai_output: title,
        model: MODEL_FOR_PDF,
        updated_at: new Date().toISOString(),
      };
    });

    const { error: writeErr } = await supabaseAdmin
      .from("company_ai_content")
      .upsert(toUpsert, { onConflict: "company_id,content_type,source_key" });

    if (writeErr) {
      return NextResponse.json(
        { error: "Supabase write failed", step, details: writeErr.message },
        { status: 500 }
      );
    }

    toUpsert.forEach((r) => cachedMap.set(r.source_key, r.ai_output));

    return NextResponse.json({
      cached: false,
      titles: Object.fromEntries(files.map((f) => [f.url, cachedMap.get(f.url)])),
    });
  } catch (err: any) {
    console.error("[doc-titles] fatal", step, err);
    return NextResponse.json(
      { error: "doc-titles failed", step, details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}