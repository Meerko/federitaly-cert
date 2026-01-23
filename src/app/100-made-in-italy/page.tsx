import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CertificationRequestForm from "@/components/forms/CertificationRequestForm";
import { Star, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FeaturesShowcase from "@/components/sections/features-showcase";


export default function Certification100MadeInItalyPage() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-[url(/images/bg-federitaly.png)] bg-cover bg-center bg-no-repeat relative flex flex-col items-center py-12">
      <div className="container z-1">
      <div className="grid lg:grid-cols-2 lg:items-center mt-16">
          <div className="col-span-1 flex flex-col space-y-6 text-center lg:text-left justify-center lg:justify-start border border-white bg-chart-4/50 backdrop-blur-xl rounded-xl px-8 py-8 shadow-lg/10 order-2 lg:order-1">
            <Badge variant="default" className="text-sm text-secondary group flex w-fit self-center lg:self-start items-center justify-center rounded-full border border-primary/10 bg-chart-4 px-4 py-1 tracking-tight shadow-lg/5">
                <BadgeCheck className="size-6 text-md" /> Certificazione Federitaly
            </Badge>

            <h1 className="text-5xl lg:text-6xl tracking-tight md:text-6xl text-balance">
              100% <br /> Made in Italy
            </h1>

            <p className="text-2xl text-bold text-muted-foreground/70">
              Quando l’italianità è totale.
            </p>

            <p className="max-w-2xl text-muted-foreground">
              La certificazione Federitaly 100% Made in Italy attesta che l’intero processo produttivo
              dell’azienda è svolto in Italia, nel rispetto della normativa vigente e dei disciplinari Federitaly.
            </p>

            <div className="flex flex-wrap gap-3 self-center lg:self-start">
              <Button asChild>
                <Link href="#apply">Richiedi la certificazione</Link>
              </Button>
            </div>
          </div>

          {/* Right visual card */}
          <div className="col-span-1 flex items-center justify-center order-1 lg:order-2 z-1 mt-[-60] lg:mt-0">
            <Image src="/images/certificazioni/100-made-in-italy-federitaly.webp" alt="Certificazione Federitaly 100% Made in Italy" width={400} height={400} className="p-24 lg:p-0 m-[-110]" />
          </div>
        </div>
      </div>
      <div className="from-background pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent via-65% to-transparent z-0" />
      </section>

      {/* COSA CERTIFICA */}
      <section className="container section-padding grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-start space-y-6">
        <div className="space-y-6">
          <Badge variant="default" className="text-sm text-secondary group flex w-fit items-center justify-center rounded-full border border-primary/10 bg-chart-4 px-3 py-1 tracking-tight shadow-lg/5">
            Cosa certifica
          </Badge>
          <h2 className="text-4xl">Processo produttivo <span className="text-primary">interamente italiano</span></h2>
          <p className="text-muted-foreground text-balance">
            La certificazione verifica la coerenza tra dichiarazioni, documentazione e realtà aziendale, garantendo che le fasi del processo siano svolte sul territorio nazionale.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Progettazione e sviluppo in Italia</p>
            <p className="text-sm text-muted-foreground">
              Fasi strategiche e decisionali svolte sul territorio nazionale.
            </p>
          </div>

          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Produzione e trasformazione in Italia</p>
            <p className="text-sm text-muted-foreground">
              Processi produttivi e trasformazioni realizzati in Italia.
            </p>
          </div>

          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Controllo del processo sul territorio</p>
            <p className="text-sm text-muted-foreground">
              Tracciabilità, responsabilità e controllo operativo in Italia.
            </p>
          </div>

          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Coerenza tra dichiarazioni e realtà</p>
            <p className="text-sm text-muted-foreground">
              Verifica di evidenze, documentazione e riscontri in azienda.
            </p>
          </div>
        </div>
      </section>

      {/* A CHI È RIVOLTA */}

      <section className="container section-padding !pt-0 grid gap-6 lg:items-start space-y-6">
        <div className="space-y-6">
          <Badge variant="default" className="text-sm text-secondary group flex w-fit items-center justify-center rounded-full border border-primary/10 bg-chart-4 px-3 py-1 tracking-tight shadow-lg/5">
            A chi è rivolta
          </Badge>
          <h2 className="text-4xl">Per le <span className="text-primary">imprese che producono valore </span> in Italia</h2>
          <p className="text-muted-foreground text-balance">
          La soluzione ideale per chi desidera comunicare correttamente l’italianità, rafforzare la credibilità sui mercati esteri e garantire conformità normativa nell’uso del claim Made in Italy.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Aziende che producono interamente in Italia</p>
          </div>

          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Imprese che vogliono posizionarsi nella fascia alta del Made in Italy</p>
          </div>

          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Brand che puntano su reputazione, valore e identità</p>
          </div>
        </div>
      </section>

      {/* COSA OTTIENE L'AZIENDA */}
      <section className="container grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-start space-y-6">
        <div className="space-y-6">
          <Badge variant="default" className="text-sm text-secondary group flex w-fit items-center justify-center rounded-full border border-primary/10 bg-chart-4 px-3 py-1 tracking-tight shadow-lg/5">
            Cosa ottiene l’azienda
          </Badge>
          <h2 className="text-4xl">Valore concreto per <span className="text-primary">reputazione</span>, <span className="text-primary">tutela</span> e <span className="text-primary">mercato</span></h2>
          <p className="text-muted-foreground text-balance">
            Rafforza credibilità e protezione del valore del Made in Italy, con strumenti di verifica pubblica e posizionamento verso buyer, clienti e istituzioni.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Uso del marchio</p>
            <p className="text-sm text-muted-foreground">
              Diritto all’uso del marchio Federitaly 100% Made in Italy.
            </p>
          </div>

          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Verifica pubblica</p>
            <p className="text-sm text-muted-foreground">
              QR Code di verifica pubblica consultabile online.
            </p>
          </div>

          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Tutela legale e reputazionale</p>
            <p className="text-sm text-muted-foreground">
              Maggiore protezione e riduzione del rischio di frode e danni reputazionali.
            </p>
          </div>

          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Credibilità B2B</p>
            <p className="text-sm text-muted-foreground">
              Affidabilità verso buyer, clienti e istituzioni.
            </p>
          </div>
          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Supporto export</p>
            <p className="text-sm text-muted-foreground">
              Strumento strategico per mercati e canali internazionali.
            </p>
          </div>
          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
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
      <section id="apply" className="section-padding !pt-0 container mt-10 space-y-6 scroll-mt-24 overflow-hidden">
        <div className="space-y-4 rounded-xl border border-primary p-6">
          <h3 className="text-4xl">Richiedi la pre-analisi <br /> per la certificazione</h3>
          <p className="text-muted-foreground">
            Compila tutti i campi e invia la richiesta. Ti ricontatteremo per i passaggi successivi. <br />
            La pre-analisi è totalmente gratuita e non comporta nessun impegno.
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