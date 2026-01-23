import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import BandoFormPage from "@/app/bando/form/page";

import CertificationRequestForm from "@/components/forms/CertificationRequestForm";

import BandoHero from "@/components/bando/hero";
import { Check, Cpu, DownloadIcon, File, Globe, Shield, Star } from "lucide-react";import Script from "next/script";

const BANDO_PDF_URL =
  "https://federitaly.squarespace.com/s/Bando_Federitaly_2026_COMPLETO.pdf";

export default function BandoPage() {
  return (
    <main className="py-10">
      {/* HERO */}
      <BandoHero />

      {/* MAIN GRID */}
      <section className="container grid gap-6 md:grid-cols-[1fr_360px] md:items-start">
        {/* LEFT */}
        <div className="space-y-10">
          {/* OVERVIEW */}
           <section className="space-y-6">
                <h2 className="text-4xl">Cosa prevede il bando</h2>
                <p className="mt-2 text-muted-foreground">
                    Il Bando Nazionale 2026 mette a disposizione 2.000 voucher da 1.000€ per sostenere le imprese italiane
                    nell’ottenimento delle certificazioni <strong>Federitaly 100% Made in Italy</strong> e{" "}
                    <strong>Federitaly Made in Italy</strong>.
                </p>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border bg-chart-4 p-4">
                        <div className="text-sm font-medium">Controlli documentali</div>
                        <p className="mt-1 text-sm text-muted-foreground">
                        Verifica dei requisiti e della documentazione.
                        </p>
                    </div>
                    <div className="rounded-xl border bg-chart-4 p-4">
                        <div className="text-sm font-medium">Audit tecnico</div>
                        <p className="mt-1 text-sm text-muted-foreground">
                        A cura di ente indipendente accreditato.
                        </p>
                    </div>
                    <div className="rounded-xl border bg-chart-4 p-4">
                        <div className="text-sm font-medium">Notarizzazione</div>
                        <p className="mt-1 text-sm text-muted-foreground">
                        attraverso tecnologia blockchain.
                        </p>
                    </div>
                </div>
            </section>
            <Separator className="my-6" />
            <section className="space-y-6">
                <h3 className="text-4xl">Finalità</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
                        <span className="inline-flex p-2 items-center justify-center rounded-md border border-input">
                        <Shield className="size-4 text-primary" />
                        </span>
                        <p className="font-medium text-foreground">Proteggere le filiere produttive italiane.</p>
                        <p className="text-sm text-muted-foreground">Garantire autenticità, origine, tracciabilità e trasparenza dei processi produttivi.</p>
                    </div>
                    <div className="space-y-2 border rounded-xl bg-chart-4 p-4"  key="promote">
                        <span className="inline-flex p-2 items-center justify-center rounded-md border border-input">
                        <Globe className="size-4 text-primary" />
                        </span>
                        <p className="font-medium text-foreground">Promuovere competitività e reputazione.</p>
                        <p className="text-sm text-muted-foreground">Rafforzare la reputazione del Made in Italy nei mercati nazionali e internazionali.</p>
                    </div>
                    <div className="space-y-2 border rounded-xl bg-chart-4 p-4"  key="innovation">
                        <span className="inline-flex p-2 items-center justify-center rounded-md border border-input">
                        <Cpu className="size-4 text-primary" />
                        </span>
                        <p className="font-medium text-foreground">Innovazione e sostenibilità.</p>
                        <p className="text-sm text-muted-foreground">Sistema di otarizzazione digitale avanzata grazie ad Orygin e DFINITY Foundation.</p>
                    </div>
                    <div className="space-y-2 border rounded-xl bg-chart-4 p-4"  key="valorize">
                        <span className="inline-flex p-2 items-center justify-center rounded-md border border-input">
                        <Star className="size-4 text-primary" />
                        </span>
                        <p className="font-medium text-foreground">Valorizzare mPMI.</p>
                        <p className="text-sm text-muted-foreground">Dare valore alle micro, piccole e medie imprese: cuore produttivo del Paese.</p>
                    </div>
                </div>
            </section>

          <Separator className="my-6" />

          <section className="space-y-6">
            <h3 className="text-4xl">Chi può partecipare</h3>
            <p className="mt-2 text-muted-foreground">
                Possono presentare domanda le <strong>micro, piccole e medie imprese</strong> <br /> ai sensi della classificazione UE (Reg. 651/2014).
            </p>
            <p className="font-semibold tracking-tight opacity-50">
            Requisiti fondamentali:
            </p>
            <ul className="space-y-4">
                <li  className="flex gap-2 lg:items-start">
                    <Check className="size-4 mt-1 text-primary" />
                    <p className="font-medium tracking-tight">
                        Sede legale <strong>e operativa</strong> in Italia
                    </p>
                </li>
                <li  className="flex gap-2 lg:items-start">
                    <Check className="size-4 mt-1 text-primary" />
                    <p className="font-medium tracking-tight">
                        Regolare iscrizione al Registro delle Imprese
                    </p>
                </li>
                <li  className="flex gap-2 lg:items-start">
                    <Check className="size-4 mt-1 text-primary" />
                    <p className="font-medium tracking-tight">
                        Nessun processo di delocalizzazione <strong>negli ultimi 5 anni</strong>
                    </p>
                </li>
                <li  className="flex gap-2 lg:items-start">
                    <Check className="size-4 mt-1 text-primary" />
                    <p className="font-medium tracking-tight">
                        Operare in filiere riconducibili al Made in Italy
                    </p>
                </li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section className="space-y-6">
            <h3 className="text-4xl">Documenti necessari</h3>
            <ul className="space-y-4">
                <li  className="flex gap-2 lg:items-start">
                    <File className="size-4 mt-1 text-primary" />
                    <p className="font-medium tracking-tight">
                        Visura camerale aggiornata
                    </p>
                </li>
                <li  className="flex gap-2 lg:items-start">
                    <File className="size-4 mt-1 text-primary" />
                    <p className="font-medium tracking-tight">
                        Documento di riconoscimento del titolare / legale rappresentante
                    </p>
                </li>
                <li  className="flex gap-2 lg:items-start">
                    <File className="size-4 mt-1 text-primary" />
                    <p className="font-medium tracking-tight">
                        Compilazione del modulo di richiesta
                    </p>
                </li>
                <li  className="flex gap-2 lg:items-start">
                    <File className="size-4 mt-1 text-primary" />
                    <p className="font-medium tracking-tight">
                        Schede prodotti o relazione sintetica del processo di produzione
                    </p>
                </li>
            </ul>
          </section>

          <Separator className="my-6" />

          {/* PROCEDURE */}
          <section className="space-y-6">
            <h3 className="text-4xl">Come funziona la procedura</h3>
            <p className="mt-2 text-muted-foreground">
              La procedura di ottenimento del voucher sviluppa in 5 semplici step:
            </p>

            <div className="mt-6 grid gap-4">
              {[
                {
                  n: "1",
                  title: "Presentazione domanda",
                  desc: "Compilazione modulo online + allegati richiesti.",
                },
                {
                  n: "2",
                  title: "Valutazione a sportello",
                  desc: "Federitaly risponde entro 30 giorni con una pre-assegnazione del voucher.",
                },
                {
                  n: "3",
                  title: "Documentazione di certificazione",
                  desc: "In caso di esito positivo, l'impresa ha 30 giorni per caricare i documenti tecnici.",
                },
                {
                  n: "4",
                  title: "Audit e verifiche",
                  desc: "A cura di QMS Italia srl, ente indipendente accreditato.",
                },
                {
                  n: "5",
                  title: "Assegnazione definitiva",
                  desc: "Federitaly conferma l’assegnazione del voucher.",
                },
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-4 rounded-xl bg-chart-4 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-input text-primary bg-background font-semibold">
                    {s.n}
                  </div>
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="text-sm text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-6" />

          <section className="space-y-6">
            <h3 className="text-4xl text-balance">Criteri di valutazione e <br/> punteggi premiali</h3>
            <p className="mt-2 text-muted-foreground">
                Le domande ricevono punteggi premiali se
            </p>
            <div>
                <table className="w-full text-left bg-chart-4 rounded-xl">
                    <thead>
                        <tr>
                            <th className="py-4 px-6">Criterio</th>
                            <th className="py-4 px-6">Punteggio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-input bg-background">
                            <td className="py-2 px-6">Impresa manifatturiera o agroalimentare</td>
                            <td className="py-2 px-6">+10</td>
                        </tr>
                        <tr className="">
                            <td className="py-2 px-6">Impresa giovanile under 35</td>
                            <td className="py-2 px-6">+5</td>
                        </tr>
                        <tr className="border-t  bg-background">
                            <td className="py-2 px-6">Impresa femminile</td>
                            <td className="py-2 px-6">+5</td>
                        </tr>
                        <tr className="border-t">
                            <td className="py-2 px-6">Presenza mercati internazionali</td>
                            <td className="py-2 px-6">+5</td>
                        </tr>
                        <tr className="border-t bg-background">
                            <td className="py-2 px-6">Innovazione o sostenibilità</td>
                            <td className="py-2 px-6">+5</td>
                        </tr>
                        <tr className="border-t">
                            <td className="py-2 px-6">Nessun incidente sul lavoro negli ultimi 5 anni</td>
                            <td className="py-2 px-6">+5</td>
                        </tr>
                        <tr className="bg-background">
                            <td className="py-2 px-6">Certificazione Parità di Genere</td>
                            <td className="py-2 px-6">+5</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>

          <Separator className="my-6" />

          <section className="space-y-6">
                <h3 className="text-4xl">Chi gestisce il processo</h3>
                <p className="mt-2 text-muted-foreground">
                    Con delibera n. 21/2025 del 27 novembre 2025 il Consiglio Direttivo Nazionale di Federitaly ha affidato i seguenti compiti: 
                </p>
                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div className="space-y-2 border rounded-xl bg-chart-4 p-4">
                        <span className="inline-flex">
                        <Image src="/images/logos/qms.webp" alt="QMS Italia srl" width={48} height={48} />
                        </span>
                        <p className="font-medium text-foreground">QMS Italia srl</p>
                        <ul className="text-sm text-muted-foreground">
                            <li>Audit</li>
                            <li>Verifiche documentali</li>
                            <li>Valutazione tecnica</li>
                        </ul>
                    </div>
                    <div className="space-y-2 border rounded-xl bg-chart-4 p-4"  key="promote">
                        <span className="inline-flex">
                        <Image src="/favicon/favicon.svg" alt="Federitaly" height={48} width={48} />
                        </span>
                        <p className="font-medium text-foreground">Federitaly</p>
                        <ul className="text-sm text-muted-foreground">
                            <li>Valutazione finale</li>
                            <li>Assegnazione voucher</li>
                            <li>Gestione del bando a livello nazionale</li>
                        </ul>
                    </div>
                </div>
            </section>
 

         
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden md:block space-y-4 md:sticky md:top-30">
          <Card id="download">
            <CardHeader className="pb-2">
              <CardTitle className="space-y-2">
                <p className="text-xl">Partecipa al bando!<br/>
                Ottieni subito uno dei 2000 voucher disponibili.</p>
                <p className="text-xs text-muted-foreground/40">
                    Apertura Bando: 25 gennaio 2026
                    <br/>
                    Chiusura Bando: 30 luglio 2026
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full" asChild>
                <a href={BANDO_PDF_URL} target="_blank" rel="noreferrer">
                  Regolamento del bando <DownloadIcon className="size-4" />
                </a>
              </Button>

              <Button className="w-full" asChild>
                <Link href="#apply">Richiedi il voucher</Link>
              </Button>

              <p className="text-xs text-muted-foreground">
                Quota residua a carico dell’impresa: <span className="text-foreground">850€ + IVA</span>.
              </p>
            </CardContent>
          </Card>
        </aside>
        <div className="md:hidden fixed inset-x-0 bottom-0 z-50 backdrop-blur-md">
            <div className="container flex items-center gap-3 pb-9 pt-1 w-fit">
                <Button size="lg" className="flex-1 rounded-full" asChild>
                    <Link href="#apply">Richiedi il voucher</Link>
                </Button>
            </div>
        </div>
      </section>
       {/* APPLY + TOGGLE */}
       <section id="apply">
            <BandoFormPage/>
          </section>
    </main>
  );
}