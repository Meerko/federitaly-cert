import Link from "next/link";

export default function CookiePolicyPage() {
  const updatedAt = "22 gennaio 2026";

  return (
    <main className="container py-10 max-w-3xl">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground">
          Ultimo aggiornamento: <span className="text-foreground">{updatedAt}</span>
        </p>
      </header>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">1. Premessa</h2>
        <p className="text-muted-foreground">
          La presente Cookie Policy descrive l’utilizzo dei cookie e di tecnologie similari sul sito{" "}
          <strong>certificazioni.federitaly.it</strong> (di seguito “Sito”), nonché le modalità con cui
          l’utente può esprimere o modificare le proprie preferenze. La presente informativa è redatta in
          conformità al Regolamento (UE) 2016/679 (GDPR) e alla normativa applicabile in materia di
          comunicazioni elettroniche.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">2. Cosa sono i cookie</h2>
        <p className="text-muted-foreground">
          I cookie sono piccoli file di testo che i siti web visitati inviano al dispositivo dell’utente
          (computer, tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti
          alla visita successiva. Il termine “cookie” può includere anche tecnologie similari che consentono
          funzionalità analoghe (ad esempio identificatori, local storage o strumenti di gestione del consenso).
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">3. Tipologie di cookie utilizzate</h2>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">3.1 Cookie tecnici (necessari)</h3>
          <p className="text-muted-foreground">
            Il Sito utilizza cookie tecnici strettamente necessari al funzionamento e alla sicurezza delle
            funzionalità richieste dall’utente. Tali cookie non richiedono il consenso preventivo e
            comprendono, a titolo esemplificativo, cookie per la gestione della navigazione, delle preferenze
            di consenso e delle misure di sicurezza.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">3.2 Cookie statistici (Google Analytics 4)</h3>
          <p className="text-muted-foreground">
            Il Sito può utilizzare cookie statistici per la misurazione delle visite e l’analisi del
            comportamento di navigazione in forma aggregata. In particolare, il Sito utilizza{" "}
            <strong>Google Analytics 4 (GA4)</strong>, un servizio di analisi web fornito da{" "}
            <strong>Google LLC</strong>.
          </p>
          <p className="text-muted-foreground">
            L’attivazione dei cookie statistici avviene <strong>solo previa acquisizione del consenso</strong>{" "}
            dell’utente tramite il banner di gestione del consenso. In assenza di consenso, tali cookie non
            vengono attivati.
          </p>
          <p className="text-muted-foreground">
            È possibile consultare l’informativa Google al seguente indirizzo:{" "}
            <a
              className="underline underline-offset-4"
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              https://policies.google.com/privacy
            </a>
            .
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">3.3 Cookie di profilazione</h3>
          <p className="text-muted-foreground">
            Il Sito non utilizza cookie di profilazione per finalità pubblicitarie o di marketing diretto
            senza il consenso preventivo dell’utente. Qualora in futuro venissero introdotti strumenti di
            profilazione, verrà fornita un’informativa aggiornata e sarà richiesto uno specifico consenso.
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">4. Gestione del consenso</h2>
        <p className="text-muted-foreground">
          Al primo accesso al Sito viene mostrato un banner che consente all’utente di:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>accettare tutti i cookie;</li>
          <li>rifiutare i cookie non necessari;</li>
          <li>personalizzare le preferenze per categorie.</li>
        </ul>
        <p className="text-muted-foreground">
          L’utente può modificare o revocare il consenso in qualsiasi momento attraverso lo strumento di
          gestione del consenso disponibile sul Sito.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">5. Come disabilitare i cookie dal browser</h2>
        <p className="text-muted-foreground">
          L’utente può gestire o disabilitare i cookie anche tramite le impostazioni del proprio browser. La
          disabilitazione dei cookie tecnici può compromettere il corretto funzionamento del Sito.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">6. Titolare del trattamento e contatti</h2>
        <p className="text-muted-foreground">
          <strong>Federitaly</strong>
        </p>
        <p className="text-muted-foreground">
          <strong>Sede Legale:</strong> Corso della Repubblica, 205 - 03043 CASSINO (FR)
          <br />
          <strong>Cod. Fiscale:</strong> 90046140605
          <br />
          <strong>PEC:</strong>{" "}
          <a
            className="underline underline-offset-4"
            href="mailto:federitaly@legalmail.it"
          >
            federitaly@legalmail.it
          </a>
        </p>
        <p className="text-muted-foreground">
          Per ulteriori informazioni sul trattamento dei dati personali, si invita a consultare la{" "}
          <Link className="underline underline-offset-4" href="/privacy-policy">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">7. Aggiornamenti</h2>
        <p className="text-muted-foreground">
          La presente Cookie Policy può essere soggetta ad aggiornamenti. Le modifiche saranno pubblicate su
          questa pagina e avranno efficacia dalla data di pubblicazione.
        </p>
      </section>
    </main>
  );
}