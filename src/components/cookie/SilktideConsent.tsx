"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function SilktideConsent() {
  useEffect(() => {
    // sicurezza: inizializza UNA SOLA VOLTA
    if ((window as any).__silktideInitialized) return;
    (window as any).__silktideInitialized = true;

    // aspetta che Silktide sia disponibile
    const interval = setInterval(() => {
      if ((window as any).silktideCookieBannerManager) {
        clearInterval(interval);

        (window as any).silktideCookieBannerManager.updateCookieBannerConfig({
          background: { showBackground: true },
          cookieIcon: { position: "bottomRight" },
          initialState: "open",

          cookieTypes: [
            {
              id: "necessari",
              name: "Necessari",
              description:
                "<p>I cookie necessari sono indispensabili per il corretto funzionamento del sito.</p>",
              required: true,
            },
            {
              id: "statistiche",
              name: "Statistiche",
              description:
                "<p>Aiutano a capire come gli utenti utilizzano il sito.</p>",
              required: false,
              onAccept: function () {
                const gtag = (window as any).gtag;
                if (gtag) {
                  gtag("consent", "update", {
                    analytics_storage: "granted",
                  });
                }
              },
              onReject: function () {
                const gtag = (window as any).gtag;
                if (gtag) {
                  gtag("consent", "update", {
                    analytics_storage: "denied",
                  });
                }
              },
            },
            {
              id: "profilazione",
              name: "Profilazione",
              description:
                "<p>Utilizzati per personalizzare contenuti e comunicazioni.</p>",
              required: false,
            },
          ],

          text: {
            banner: {
              description:
                "<p><strong>Questo sito utilizza cookie</strong></p><p>Utilizziamo cookie tecnici necessari e, previo consenso, cookie statistici e di profilazione.</p><p>Per maggiori informazioni consulta la Cookie Policy.</p>",
              acceptAllButtonText: "Accetta tutti",
              rejectNonEssentialButtonText: "Rifiuta i non essenziali",
              preferencesButtonText: "Preferenze",
            },
            preferences: {
              title: "Preferenze cookie",
              description:
                "<p>Puoi modificare le tue preferenze in qualsiasi momento.</p>",
            },
          },

          position: { banner: "bottomCenter" },
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <Script
      src="/cookie-banner/silktide-consent-manager.js"
      strategy="afterInteractive"
    />
  );
}