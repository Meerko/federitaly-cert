// src/app/thank-you/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Mail, ShieldCheck } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="container text-center justify-center py-16">
      <section className="space-y-10 items-center justify-center border border-secondary/10 rounded-xl p-16">
        {/* Badge */}
        <div className="flex justify-center">
          <Badge
            variant="default"
            className="flex items-center gap-2 rounded-full border border-primary/10 bg-chart-4 px-4 py-1 text-primary"
          >
            <CheckCircle2 className="size-4" />
            Richiesta inviata correttamente
          </Badge>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl tracking-tight font-semibold">
            Grazie per averci contattato
          </h1>
          <p className="text-lg text-muted-foreground">
            La tua richiesta è stata ricevuta correttamente ed è ora in fase di
            presa in carico.
          </p>
        </div>

        {/* What happens next */}
        <div className="grid gap-4 rounded-xl border bg-chart-4 p-6 justify-center">
          <h2 className="text-3xl">
            Cosa succede adesso
          </h2>

          <ul className="space-y-4 text-muted-foreground w-fit justify-center flex flex-col items-center">
            <li className="flex gap-4 items-center rounded-lg py-4 px-6 border border-secondary/10 text-balance w-fit">
              <Clock className="size-5 text-primary shrink-0" />
              <span>
                Il nostro team analizzerà le informazioni fornite per verificare
                l’ammissibilità della richiesta.
              </span>
            </li>

            <li className="flex gap-4 items-center rounded-lg py-4 px-6 border border-secondary/10 text-balance w-fit">
              <Mail className="size-5 text-primary shrink-0" />
              <span>
                Verrai ricontattato via email o telefono per i prossimi passaggi
                o per eventuali integrazioni.
              </span>
            </li>

            <li className="flex gap-4 items-center rounded-lg py-4 px-6 border border-secondary/10 text-balance w-fit">
              <ShieldCheck className="size-5 text-primary shrink-0" />
              <span>
                Tutte le informazioni condivise saranno trattate nel rispetto
                della normativa vigente.
              </span>
            </li>
          </ul>
        </div>

        {/* Timing note */}
        <p className="text-sm text-muted-foreground">
          In genere rispondiamo entro <strong>3–5 giorni lavorativi</strong>.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Button asChild>
            <Link href="/">Torna alla homepage</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}