"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { ArrowUpRight, FileBadge } from "lucide-react";

type Doc = { url: string; filename: string };

export default function DocumentListAI({
  companyId,
  docs,
  language = "it",
}: {
  companyId: string;
  docs: Doc[];
  language?: "it" | "en";
}) {
  const [titleMap, setTitleMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const urls = useMemo(() => docs.map((d) => d.url), [docs]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!companyId || docs.length === 0) return;

      // 1) read from Supabase (instant)
      const { data } = await supabase
        .from("company_ai_content")
        .select("source_key, ai_output")
        .eq("company_id", companyId)
        .eq("content_type", "document_title")
        .in("source_key", urls);

      const cached: Record<string, string> = {};
      (data ?? []).forEach((r: any) => {
        if (r.source_key && r.ai_output) cached[r.source_key] = r.ai_output;
      });

      if (!cancelled) setTitleMap((prev) => ({ ...prev, ...cached }));

      // 2) missing -> call API once
      const missing = docs.filter((d) => !cached[d.url]);
      if (missing.length === 0) return;

      setLoading(true);

      const res = await fetch("/api/doc-titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId,
          language,
          files: missing.map((d) => ({ url: d.url, filename: d.filename })),
        }),
      });

      const json = await res.json().catch(() => null);

      if (!cancelled && json?.titles) {
        setTitleMap((prev) => ({ ...prev, ...json.titles }));
      }

      setLoading(false);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [companyId, docs, urls, language]);

  if (!docs.length) return null;

  return (
    <div className="space-y-2">
        {docs.map((d) => (
          <a
            key={d.url}
            href={d.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-muted space-x-2"
          >
            <FileBadge className="size-4 text-primary" />
            <span className="truncate flex items-center w-full justify-between">{titleMap[d.url] ?? d.filename}
            <ArrowUpRight className="size-4 text-muted-foreground" /> </span>
          </a>
        ))}
      </div>
  );
}