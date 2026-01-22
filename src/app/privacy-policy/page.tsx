// src/app/privacy-policy/page.tsx

import Link from "next/link";

export default function PrivacyPolicyPage() {
  const updatedAt = "22 gennaio 2026"; // aggiorna quando necessario

  return (
    <main className="container py-10 max-w-3xl">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">
          Informativa ai sensi dell’art. 13 del Regolamento (UE) 2016/679 (GDPR)
          <br />
          Ultimo aggiornamento:{" "}
          <span className="text-foreground">{updatedAt}</span>
        </p>
      </header>

      {/* 1 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">1. Premessa</h2>
        <p className="text-muted-foreground">
          La presente informativa descrive le modalità di trattamento dei dati
          personali degli utenti che interagiscono con il sito web di Federitaly.
          Il trattamento avviene nel rispetto dei principi di liceità,
          correttezza, trasparenza, minimizzazione e sicurezza, in conformità al
          Regolamento (UE) 2016/679 (“GDPR”).
        </p>
      </section>

      {/* 2 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          2. Titolare del trattamento
        </h2>
        <p className="text-muted-foreground">
          <strong>Federitaly</strong>
        </p>
        <p className="text-muted-foreground">
          <strong>Sede legale:</strong> Corso della Repubblica, 205 – 03043 Cassino
          (FR), Italia
          <br />
          <strong>Codice Fiscale:</strong> 90046140605
          <br />
          <strong>Email:</strong>{" "}
          <a
            href="mailto:info@federitaly.it"
            className="underline underline-offset-4"
          >
            info@federitaly.it
          </a>
          <br />
          <strong>PEC:</strong>{" "}
          <a
            href="mailto:federitaly@legalmail.it"
            className="underline underline-offset-4"
          >
            federitaly@legalmail.it
          </a>
        </p>
      </section>

      {/* 3 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          3. Tipologie di dati trattati
        </h2>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">a) Dati di navigazione</h3>
          <p className="text-muted-foreground">
            I sistemi informatici e le procedure software preposte al
            funzionamento del sito acquisiscono, nel corso del loro normale
            esercizio, alcuni dati personali la cui trasmissione è implicita
            nell’uso dei protocolli di comunicazione Internet. Tali dati non sono
            raccolti per essere associati a interessati identificati, ma
            potrebbero consentire l’identificazione dell’utente tramite
            elaborazioni e associazioni con dati detenuti da terzi.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            b) Dati forniti volontariamente dall’utente
          </h3>
          <p className="text-muted-foreground">
            L’invio facoltativo, esplicito e volontario di dati tramite moduli di
            contatto, richieste di informazioni, adesioni associative o altre
            funzionalità del sito comporta l’acquisizione dei dati forniti
            dall’utente, quali a titolo esemplificativo: nome, cognome, indirizzo
            email, numero di telefono, azienda.
          </p>
        </div>
      </section>

      {/* 4 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          4. Finalità del trattamento
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>rispondere a richieste di informazioni o contatto;</li>
          <li>gestire comunicazioni istituzionali e associative;</li>
          <li>gestire iscrizioni, adesioni e servizi offerti da Federitaly;</li>
          <li>
            inviare comunicazioni informative e newsletter, previo consenso;
          </li>
          <li>adempiere a obblighi di legge o regolamentari;</li>
          <li>
            garantire il corretto funzionamento e la sicurezza del sito web.
          </li>
        </ul>
      </section>

      {/* 5 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          5. Base giuridica del trattamento
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>consenso dell’interessato;</li>
          <li>
            esecuzione di un contratto o di misure precontrattuali richieste
            dall’interessato;
          </li>
          <li>adempimento di obblighi legali;</li>
          <li>
            legittimo interesse del Titolare, nei limiti consentiti dal GDPR.
          </li>
        </ul>
      </section>

      {/* 6 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          6. Modalità del trattamento
        </h2>
        <p className="text-muted-foreground">
          Il trattamento dei dati personali è effettuato con strumenti
          informatici e telematici, nel rispetto delle misure di sicurezza
          previste dal GDPR. Federitaly adotta misure tecniche e organizzative
          adeguate a prevenire la perdita dei dati, usi illeciti o non corretti e
          accessi non autorizzati.
        </p>
      </section>

      {/* 7 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          7. Conservazione dei dati
        </h2>
        <p className="text-muted-foreground">
          I dati personali sono conservati per il tempo strettamente necessario
          al perseguimento delle finalità per cui sono stati raccolti e nel
          rispetto dei termini previsti dalla normativa vigente.
        </p>
      </section>

      {/* 8 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          8. Comunicazione e diffusione dei dati
        </h2>
        <p className="text-muted-foreground">
          I dati personali non saranno diffusi. Potranno essere comunicati
          esclusivamente a soggetti autorizzati o responsabili del trattamento,
          quali fornitori di servizi informatici, consulenti o autorità pubbliche,
          nei limiti delle finalità sopra indicate.
        </p>
      </section>

      {/* 9 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          9. Trasferimento verso Paesi extra UE
        </h2>
        <p className="text-muted-foreground">
          Il Titolare non trasferisce dati personali verso Paesi terzi al di fuori
          dell’Unione Europea. Qualora ciò si rendesse necessario, il
          trasferimento avverrà nel rispetto delle garanzie previste dal GDPR.
        </p>
      </section>

      {/* 10 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          10. Diritti dell’interessato
        </h2>
        <p className="text-muted-foreground">
          L’interessato può esercitare in qualsiasi momento i diritti previsti
          dagli articoli 15–22 del GDPR, tra cui:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>diritto di accesso ai dati personali;</li>
          <li>diritto di rettifica o cancellazione;</li>
          <li>diritto alla limitazione del trattamento;</li>
          <li>diritto di opposizione;</li>
          <li>diritto alla portabilità dei dati;</li>
          <li>diritto di revocare il consenso prestato;</li>
          <li>
            diritto di proporre reclamo all’Autorità Garante per la protezione dei
            dati personali.
          </li>
        </ul>
        <p className="text-muted-foreground">
          Le richieste possono essere inviate a{" "}
          <a
            href="mailto:info@federitaly.it"
            className="underline underline-offset-4"
          >
            info@federitaly.it
          </a>{" "}
          o{" "}
          <a
            href="mailto:federitaly@legalmail.it"
            className="underline underline-offset-4"
          >
            federitaly@legalmail.it
          </a>
          .
        </p>
      </section>

      {/* 11 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">11. Cookie</h2>
        <p className="text-muted-foreground">
          Il sito utilizza cookie tecnici e, previo consenso, cookie di natura
          statistica o altri strumenti di tracciamento. Per maggiori informazioni
          è possibile consultare la{" "}
          <Link
            href="/cookie-policy"
            className="underline underline-offset-4"
          >
            Cookie Policy
          </Link>
          .
        </p>
      </section>

      {/* 12 */}
      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          12. Modifiche alla presente informativa
        </h2>
        <p className="text-muted-foreground">
          La presente Privacy Policy può essere soggetta a modifiche o
          aggiornamenti. Si invita l’utente a consultarla periodicamente per
          prendere visione di eventuali variazioni.
        </p>
      </section>
    </main>
  );
}