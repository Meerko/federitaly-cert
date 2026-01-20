"use client";

import { useEffect, useState } from "react";

export default function AboutAI({
  companyId,
  aboutOriginal,
  language = "it",
}: {
  companyId: string;
  aboutOriginal?: string;
  language?: "it" | "en";
}) {
  const [text, setText] = useState(aboutOriginal);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!aboutOriginal || aboutOriginal.trim().length < 30) return;

    let cancelled = false;

    setText(aboutOriginal); // sempre base on-chain
    setLoading(true);

    fetch("/api/normalize-about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId, aboutOriginal, language }),
    })
      .then((r) => r.json())
      .then((res) => {
        // se arriva il testo, sostituisci
        if (!cancelled && res?.about) setText(res.about);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [companyId, aboutOriginal, language]);

  if (!text) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
      {loading && (
        <span className="text-xs text-muted-foreground">Ottimizzazione del testo…</span>
      )}
    </div>
  );
}