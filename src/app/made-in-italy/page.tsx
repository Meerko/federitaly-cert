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
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center mt-16">
          <div className="col-span-1 flex flex-col space-y-6 text-center lg:text-left justify-center lg:justify-start border border-white bg-chart-4/50 backdrop-blur-xl rounded-xl px-8 py-8 shadow-lg/10 order-2 lg:order-1">
            <Badge variant="default" className="text-sm text-secondary group flex w-fit self-center lg:self-start items-center justify-center rounded-full border border-primary/10 bg-chart-4 px-4 py-1 tracking-tight shadow-lg/5">
                <BadgeCheck className="size-6 text-md" /> Certificazione Federitaly
            </Badge>

            <h1 className="text-5xl lg:text-6xl tracking-tight md:text-6xl">
              Made in Italy
            </h1>

            <p className="text-2xl text-bold text-balance text-muted-foreground/70">
              Quando l’Italia è parte essenziale del processo.
            </p>

            <p className="max-w-2xl text-muted-foreground">
             È una certificazione di processo che attesta che il processo produttivo principale avviene in Italia, nel rispetto della normativa vigente sul Made in Italy. <br /><i>(Codice Doganale UE – art. 60)</i>.
            </p>

            <div className="flex flex-wrap gap-3 self-center lg:self-start">
              <Button asChild>
                <Link href="#apply">Richiedi la certificazione</Link>
              </Button>
            </div>
          </div>

          {/* Right visual card */}
          <div className="col-span-1 flex items-center justify-center order-1 lg:order-2 z-1 mt-[-30] lg:mt-0">
            <Image src="/images/certificazioni/made-in-italy-federitaly.webp" alt="Certificazione Federitaly 100% Made in Italy" width={400} height={400} className="p-24 lg:p-0 m-[-150]" />
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
          <h2 className="text-4xl"><span className="text-primary">Fasi strategiche</span>, in Italia con <span className="text-primary">responsabilità</span> italiana</h2>
          <p className="text-muted-foreground text-balance">
            La certificazione verifica che le fasi qualificanti del processo produttivo siano effettivamente svolte in Italia e che l’azienda mantenga controllo, know-how e responsabilità sulle attività dichiarate.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Il cuore del processo produttivo è svolto in Italia</p>
            <p className="text-sm text-muted-foreground">
              Le attività chiave e qualificanti avvengono sul territorio nazionale.
            </p>
          </div>

          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Trasparenza del processo e tracciabilità documentale</p>
            <p className="text-sm text-muted-foreground">
              Competenze, controllo e responsabilità restano in capo all’azienda italiana.
            </p>
          </div>

          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Coerenza con la normativa europea sul concetto di “origine”</p>
            <p className="text-sm text-muted-foreground">
              Verifica di allineamento tra ciò che viene dichiarato e ciò che accade davvero nella realtà produttiva.
            </p>
          </div>

          <div className="space-y-2 border border-secondary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">L’azienda opera secondo disciplinari e protocolli Federitaly</p>
            <p className="text-sm text-muted-foreground">
              Applicazione dei criteri oggettivi definiti da Federitaly per la certificazione.
            </p>
          </div>
        </div>
      </section>

      {/* A CHI È RIVOLTA */}

      <section className="container grid gap-6 lg:items-start space-y-6">
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
            <p className="font-medium text-foreground">Aziende che producono in Italia ma utilizzano componenti, semilavorati o materie prime estere</p>
          </div>

          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Imprese che vogliono legittimare correttamente l’uso del claim “Made in Italy”</p>
          </div>

          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <BadgeCheck className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Realtà orientate ai mercati internazionali che necessitano di credibilità e conformità normativa</p>
          </div>
        </div>
      </section>

      {/* COSA OTTIENE L'AZIENDA */}
      <section className="section-padding container grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-start space-y-6">
        <div className="space-y-6">
          <Badge variant="default" className="text-sm text-secondary group flex w-fit items-center justify-center rounded-full border border-primary/10 bg-chart-4 px-3 py-1 tracking-tight shadow-lg/5">
            Cosa ottiene l’azienda
          </Badge>
          <h2 className="text-4xl">Più <span className="text-primary">trasparenza</span>, meno rischi, maggiore affidabilità</h2>
          <p className="text-muted-foreground text-balance">
            La certificazione rafforza la credibilità dell’azienda, migliorando la trasparenza verso il mercato e riducendo il rischio di contestazioni o interpretazioni ambigue sull’origine e sul valore del processo.
          </p>
          <Button asChild>
            <Link href="#apply">Richiedi la certificazione</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Uso del marchio</p>
            <p className="text-sm text-muted-foreground">
              Diritto all’uso del marchio Federitaly Made in Italy.
            </p>
          </div>

          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Verifica pubblica</p>
            <p className="text-sm text-muted-foreground">
              QR Code di verifica pubblica consultabile online.
            </p>
          </div>

          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Riduzione rischio di contestazioni</p>
            <p className="text-sm text-muted-foreground">
              Minore esposizione a contestazioni su origine e dichiarazioni commerciali.
            </p>
          </div>

          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Maggiore affidabilità commerciale</p>
            <p className="text-sm text-muted-foreground">
              Più credibilità verso buyer, clienti e istituzioni.
            </p>
          </div>
          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
            <span className="inline-flex p-2 items-center justify-center rounded-md border border-input bg-background">
              <Star className="size-4 text-primary" />
            </span>
            <p className="font-medium text-foreground">Posizionamento più solido</p>
            <p className="text-sm text-muted-foreground">
              Un messaggio più credibile e strutturato sul valore della componente italiana.
            </p>
          </div>
          <div className="space-y-2 border border-primary/10 hover:shadow-lg/5 transition-all duration-300 rounded-xl bg-chart-4 p-4">
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
      <FeaturesShowcase />

      {/* APPLY */}
      <section id="apply" className="container mt-10  pb-24 space-y-6 scroll-mt-24 overflow-hidden">
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