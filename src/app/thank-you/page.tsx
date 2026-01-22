// src/app/thank-you/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ClipboardCheck, Clock, Mail, ShieldCheck } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="container text-center bg-chart-4 rounded-5xl justify-center p-2 my-12 shadow-lg/5">
      <section className="space-y-4 items-center border border-primary/10 bg-background rounded-5xl p-8 justify-center">
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
        <div className="grid gap-4 px-6 py-8 justify-center">
          <p className="text-xl f mb-2">
            Cosa succede adesso
          </p>

          <ul className="text-muted-foreground w-fit justify-center flex flex-col md:flex-row gap-4 items-center">
            <li className="flex flex-col gap-4 text-left rounded-lg py-4 px-6 border border-secondary/10 text-balance w-fit">
              <ClipboardCheck className="size-5 text-primary shrink-0" />
              <span>
                Il nostro team analizzerà le informazioni fornite per verificare
                l’ammissibilità della richiesta.
              </span>
            </li>

            <li className="flex flex-col gap-4 text-left rounded-lg py-4 px-4 border border-secondary/10 text-balance w-fit">
              <Mail className="size-5 text-primary shrink-0" />
              <span>
                Verrai ricontattato via email o telefono per i prossimi passaggi
                o per eventuali integrazioni.
              </span>
            </li>

            <li className="flex flex-col gap-4 text-left rounded-lg py-4 px-6 border border-secondary/10 text-balance w-fit">
              <ShieldCheck className="size-5 text-primary shrink-0" />
              <span>
                Tutte le informazioni condivise saranno trattate nel rispetto
                della normativa vigente.
              </span>
            </li>
          </ul>
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
        </div>
      </section>
    </main>
  );
}