"use client";

import Script from "next/script";

export default function JotformEmbed() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-2xl border bg-chart-4 p-6 md:p-8">
        <h2 className="text-4xl tracking-tight">Compila la domanda</h2>
        <p className="mt-2 text-muted-foreground">
          Compila tutti i campi richiesti. La procedura richiede alcuni minuti.
        </p>

        <div className="mt-6 rounded-xl border bg-background p-3 md:p-4">
          {/* CSS override */}
          <link rel="stylesheet" href="/jotform/jotform-override.css" />

          {/* iFrame */}
          <iframe
            id="JotFormIFrame-253421511389051"
            title="Bando Federitaly 2026"
            onLoad={() => {
              // opzionale: forzi altezza responsiva (Jotform)
              // @ts-ignore
              if (window?.parentIFrame) {
                // nothing
              }
            }}
            allow="geolocation; microphone; camera"
            src="https://eu.jotform.com/253421511389051"
            style={{ width: "100%", height: "1200px", border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}