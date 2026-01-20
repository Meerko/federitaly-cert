import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const Schema = z.object({
  companyId: z.string().min(3),
  aboutOriginal: z.string().min(30),
  language: z.enum(["it", "en"]).default("it"),
  force: z.boolean().optional(),
});

function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

async function callOpenAIAbout(about: string, language: "it" | "en") {
  const prompt =
    language === "it"
      ? `
Riscrivi il testo seguente in italiano in modo più chiaro e leggibile.
Vincoli:
- massimo 1000 caratteri (spazi inclusi)
- tono istituzionale e neutro
- non inventare informazioni
Testo:
"""${about}"""
`.trim()
      : `
Rewrite the text below in English, clearer and more readable.
Rules:
- max 5 sentences
- neutral institutional tone
- do not invent information
Text:
"""${about}"""
`.trim();

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: prompt,
      max_output_tokens: 260,
    }),
  });

  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();

  const out =
    json.output_text ??
    json?.output?.[0]?.content?.[0]?.text ??
    "";

  return String(out).trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    const parsed = Schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Validation error" }, { status: 400 });

    const { companyId, aboutOriginal, language } = parsed.data;
    const force = !!parsed.data.force;

    const content_type = "about";
    const source_key = `about_${language}`;
    const source_value = "About Italy is Unique";
    const source_hash = sha256(aboutOriginal.trim());

    if (!force) {
      const { data, error } = await supabaseAdmin
        .from("company_ai_content")
        .select("ai_output")
        .eq("company_id", companyId)
        .eq("content_type", content_type)
        .eq("source_key", source_key)
        .maybeSingle();

      if (error) {
        return NextResponse.json({ error: "Supabase read failed", details: error.message }, { status: 500 });
      }

      if (data?.ai_output) {
        return NextResponse.json({ about: data.ai_output, cached: true });
      }
    }

    const normalized = await callOpenAIAbout(aboutOriginal, language);

    const { error: writeErr } = await supabaseAdmin
      .from("company_ai_content")
      .upsert(
        {
          company_id: companyId,
          language,
          content_type,
          source_key,
          source_value,
          source_hash,
          original_text: aboutOriginal,
          ai_output: normalized,
          model: "gpt-4.1-mini",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "company_id,content_type,source_key" }
      );

    if (writeErr) {
      return NextResponse.json({ error: "Supabase write failed", details: writeErr.message }, { status: 500 });
    }

    return NextResponse.json({ about: normalized, cached: false });
  } catch (err: any) {
    return NextResponse.json(
      { error: "normalize-about failed", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}