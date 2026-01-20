import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CertificationRequestForm from "@/components/forms/CertificationRequestForm";
import { Star, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FeaturesShowcase from "@/components/sections/features-showcase";


export default function Certification100MadeInItalyPage() {
  return (
    <main className="py-10" style={{
      background:
        "radial-gradient(250% 250% at 50% 110%, var(--background) 40%, var(--primary) 60%)",
    }}>
      {/* HERO */}
      <section className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center mt-16">
          <div className="col-span-1 flex flex-col space-y-6 text-center lg:text-left justify-center lg:justify-start">
            <Badge variant="default" className="text-sm text-primary group flex w-fit self-center lg:self-start items-center justify-center rounded-full border border-primary/10 bg-chart-4 px-4 py-1 tracking-tight shadow-lg/5">
                <BadgeCheck className="size-6 text-md" /> Certificazione Federitaly
            </Badge>

            <h1 className="text-5xl lg:text-6xl tracking-tight md:text-6xl">
              Made in Italy
            </h1>

            <p className="text-2xl text-bold text-muted-foreground/70">
              Quando l’Italia è parte essenziale del processo.
            </p>

            <p className="max-w-2xl text-muted-foreground">
              La certificazione Federitaly Made in Italy è pensata per quelle aziende che, pur operando in contesti produttivi complessi o internazionali, mantengono in Italia le fasi strategiche e qualificanti del processo produttivo.
            </p>

            <p className="max-w-2xl text-muted-foreground">
            È una certificazione trasparente, che distingue correttamente tra italianità reale, italianità parziale e semplice evocazione commerciale, garantendo coerenza tra comunicazione e realtà produttiva.
            </p>

            <div className="flex flex-wrap gap-3 self-center lg:self-start">
              <Button asChild>
                <Link href="#apply">Richiedi la certificazione</Link>
              </Button>
            </div>
          </div>

          {/* Right visual card */}
          <div className="col-span-1 flex items-center justify-center">
            <Image src="/images/certificazioni/made-in-italy-federitaly.webp" alt="Certificazione Federitaly 100% Made in Italy" width={400} height={400} className="w-fit" />
          </div>
        </div>

      </section>

      {/* COSA CERTIFICA */}
      <section className="container section-padding grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-start space-y-6">
        <div className="space-y-6">
          <Badge variant="default" className="text-sm text-primary group flex w-fit items-center justify-center rounded-full border border-primary/10 bg-chart-4 px-3 py-1 tracking-tight shadow-lg/5">
            Cosa certifica
          </Badge>
          <h2 className="text-4xl"><span className="text-primary">Fasi strategiche</span>, in Italia con <span className="text-primary">responsabilità</span> italiana</h2>
          <p className="text-muted-foreground text-balance">
            La certificazione verifica che le fasi qualificanti del processo produttivo siano effettivamente svolte in Italia e che l’azienda mantenga controllo, know-how e responsabilità sulle attività dichiarate.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Fasi produttive strategiche svolte in Italia</p>
            <p className="text-sm text-muted-foreground">
              Le attività chiave e qualificanti avvengono sul territorio nazionale.
            </p>
          </div>

          <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Know-how e controllo italiano</p>
            <p className="text-sm text-muted-foreground">
              Competenze, controllo e responsabilità restano in capo all’azienda italiana.
            </p>
          </div>

          <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Coerenza tra comunicazione e realtà produttiva</p>
            <p className="text-sm text-muted-foreground">
              Verifica di allineamento tra ciò che viene dichiarato e ciò che accade davvero nella realtà produttiva.
            </p>
          </div>

          <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Rispetto dei disciplinari Federitaly</p>
            <p className="text-sm text-muted-foreground">
              Applicazione dei criteri oggettivi definiti da Federitaly per la certificazione.
            </p>
          </div>
        </div>
      </section>

      {/* COSA OTTIENE L'AZIENDA */}
      <section className="container grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-start space-y-6">
        <div className="space-y-6">
          <Badge variant="default" className="text-sm text-primary group flex w-fit items-center justify-center rounded-full border border-primary/10 bg-chart-4 px-3 py-1 tracking-tight shadow-lg/5">
            Cosa ottiene l’azienda
          </Badge>
          <h2 className="text-4xl">Più <span className="text-primary">trasparenza</span>, meno rischi, maggiore affidabilità</h2>
          <p className="text-muted-foreground text-balance">
            La certificazione rafforza la credibilità dell’azienda, migliorando la trasparenza verso il mercato e riducendo il rischio di contestazioni o interpretazioni ambigue sull’origine e sul valore del processo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Uso del marchio</p>
            <p className="text-sm text-muted-foreground">
              Diritto all’uso del marchio Federitaly Made in Italy.
            </p>
          </div>

          <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Verifica pubblica</p>
            <p className="text-sm text-muted-foreground">
              QR Code di verifica pubblica consultabile online.
            </p>
          </div>

          <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Riduzione rischio di contestazioni</p>
            <p className="text-sm text-muted-foreground">
              Minore esposizione a contestazioni su origine e dichiarazioni commerciali.
            </p>
          </div>

          <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Maggiore affidabilità commerciale</p>
            <p className="text-sm text-muted-foreground">
              Più credibilità verso buyer, clienti e istituzioni.
            </p>
          </div>
          <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Posizionamento più solido</p>
            <p className="text-sm text-muted-foreground">
              Un messaggio più credibile e strutturato sul valore della componente italiana.
            </p>
          </div>
          <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Trasparenza verificabile</p>
            <p className="text-sm text-muted-foreground">
              Tracciabilità e proof digitale tramite blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      /<FeaturesShowcase />

      {/* APPLY */}
      <section id="apply" className="container mt-10 space-y-6 scroll-mt-24 overflow-hidden">
        <div className="space-y-4 rounded-xl border border-primary p-6">
          <h3 className="text-4xl">Richiedi la certificazione</h3>
          <p className="text-muted-foreground">
            Compila tutti i campi e invia la richiesta. Ti ricontatteremo per i passaggi successivi.
          </p>

          <div className="p-6 rounded-xl bg-chart-4">
            {/* Il form ha già tabs Made in / 100% */}
            <CertificationRequestForm />
          </div>
        </div>
      </section>

      {/* MOBILE STICKY CTA (ok come nel bando) */}
      <div className="md:hidden fixed inset-x-0 bottom-9 z-50">
        <div className="container flex items-center gap-3 py-3 w-fit">
          <Button size="lg" className="flex-1 rounded-full shadow-lg/30" asChild>
            <Link href="#apply">Richiedi la certificazione</Link>
          </Button>
        </div>
      </div>
      <div className="md:hidden h-20" />
    </main>
  );
}