"use client";

import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";

export default function BandoFormPage() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (typeof e.data !== "string") return;

      // Jotform invia messaggi tipo: "setHeight:2480"
      if (e.data.startsWith("setHeight:")) {
        const height = Number(e.data.replace("setHeight:", ""));
        if (!height || !iframeRef.current) return;

        iframeRef.current.style.height = `${height}px`;
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <main className="container py-10">
      <div className="space-y-4 rounded-5xl border-16  border-primary/5 bg-primary/1 px-6 shadow-lg/5 md:p-8">
        {/* Header */}
        <div className="space-y-4 p-6">
          <Badge
            variant="default"
            className="w-fit rounded-full border border-primary/10 bg-chart-4 px-4 py-1 text-sm tracking-tight text-secondary shadow-lg/5"
          >
            Bando Nazionale 2026
          </Badge>

          <h1 className="text-5xl tracking-tight">
            Modulo di domanda <br /> per micro, piccole e medie imprese
          </h1>

          <p className="mt-2 text-muted-foreground">
            Da compilare a cura del rappresentante legale dell&apos;impresa
            richiedente.
          </p>
        </div>

        {/* Iframe wrapper */}
        <div className="mt-6 overflow-hidden rounded-xl border border-primary/10">
          <iframe
            ref={iframeRef}
            id="jotform-iframe"
            src="/jotform/bando-jotform.html"
            title="Domanda Federitaly"
            scrolling="no"
            style={{
              width: "100%",
              border: 0,
              overflow: "hidden",
              display: "block",
            }}
          />
        </div>
      </div>
    </main>
  );
}