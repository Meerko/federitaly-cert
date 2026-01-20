// src/app/certified-companies/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import {
  CardContainer,
  CardItem,
  CardBody,
} from "@/components/aceternity/3d-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { fetchCompanyDetail } from "@/lib/prptl";

import {
  Globe,
  Phone,
  Mail,
  StampIcon,
  BadgeCheck,
  ChevronDown,
  GanttChartIcon,
  Package,
  Folder,
} from "lucide-react";

import VideoCertification from "@/components/sections/video-certification";
import { ProductGallery } from "@/components/sections/product-gallery";
import AboutAI from "@/components/aboutAI";
import DocumentListAI from "@/components/documentListAI";
import { CompanyLegalInfo } from "@/components/sections/cert-company-legal";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type CertifiedCompanyPageProps = {
  params: any;
};

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

function isExpired(iso?: string) {
  if (!iso) return false;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() < Date.now();
}

function formatDateIt(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

function certTypeLabel(t?: string) {
  if (t === "100%") return "100% Made in Italy";
  if (t === "madeinitaly") return "Made in Italy";
  return "Made in Italy";
}

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

function StatusPill({ expired }: { expired: boolean }) {
  const dotClass = expired ? "bg-red-500" : "bg-emerald-500";
  const borderClass = expired ? "border-red-200" : "border-emerald-200";
  const textClass = expired ? "text-red-700" : "text-emerald-700";
  const bgClass = expired ? "bg-red-50" : "bg-emerald-50";

  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm",
        borderClass,
        bgClass,
        textClass,
      ].join(" ")}
    >
      <span
        className={["h-2 w-2 rounded-full animate-pulse", dotClass].join(" ")}
      />
      <span className="font-medium">
        {expired ? "Certificazione Scaduta" : "Certificazione Valida"}
      </span>
    </div>
  );
}

function ContactPill({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full border bg-chart-4 px-3 py-1 text-sm text-foreground transition hover:bg-muted"
    >
      <span className="text-primary opacity-80">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}

function firstTwoSentences(text?: string) {
  if (!text) return undefined;
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return undefined;

  const parts = t.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (parts.length === 0) return undefined;
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[1]}`;
}

function TimelineRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b py-2 last:border-b-0">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value ?? "—"}</div>
    </div>
  );
}

function splitCertifiedProducts(text: string): string[] {
  const t = text.replace(/\s+/g, " ").trim();

  const candidates = t
    .split(/\n+|;|\s\.\s|\s{2,}/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const uniq =
    candidates.length > 1
      ? Array.from(new Set(candidates))
      : t
          .split(/\.\s+/g)
          .map((s) => s.trim())
          .filter(Boolean);

  return uniq.slice(0, 12);
}

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default async function CertifiedCompanyPage({
  params,
}: CertifiedCompanyPageProps) {
  const c = await fetchCompanyDetail(params.id);
  if (!c) notFound();

  const expired = isExpired(c.expirationDate);

  const websiteHref = c.website
    ? c.website.startsWith("http")
      ? c.website
      : `https://${c.website}`
    : undefined;

  const phoneHref = c.phone ? `tel:${c.phone.replace(/\s+/g, "")}` : undefined;
  const emailHref = c.email ? `mailto:${c.email}` : undefined;

  const description = firstTwoSentences(c.activityDescription);

  return (
    <main className="container py-10 space-y-16">
      {/* HERO 2 colonne */}
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {/* LEFT */}
        <div className="space-y-4">
          {/* Pill stato sopra al nome */}
          <StatusPill expired={expired} />

          {/*Nome sulla stessa riga */}
          <div className="flex items-center gap-4">
            <h1 className="text-4xl leading-tight">{c.name}</h1>
          </div>

          {/* Contatti come pills con icona */}
          <div className="flex flex-wrap gap-2">
            {websiteHref && (
              <ContactPill href={websiteHref} label="Sito Web" icon={<Globe size={16} />} />
            )}
            {phoneHref && (
              <ContactPill href={phoneHref} label="Telefono" icon={<Phone size={16} />} />
            )}
            {emailHref && (
              <ContactPill href={emailHref} label="Email" icon={<Mail size={16} />} />
            )}
          </div>

          {/* Estratto descrizione (prime 2 frasi) */}
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}

          {/* BLOCCO 3 — Descrizione azienda + Prodotti certificati */}
            <div className="rounded-xl border border-input p-4 space-y-4">
            {c.certificationProcessText && (
                <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="border border-input rounded-md p-1">
                        <GanttChartIcon className="size-4 text-primary" />
                    </span>
                    <span className="text-sm font-semibold">Processo produttivo certificato</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    {c.certificationProcessText}
                </p>
                </div>
            )}
            {/* Prodotti certificati */}
            <Collapsible className="w-full">
                <CollapsibleTrigger className="z-1 w-full group border border-input rounded-md inline-flex items-center justify-between p-2 text-muted-foreground bg-chart-4">
                    <div className="flex items-center gap-2">
                        <span className="border border-input rounded-md p-1">
                            <Package className="size-4 text-primary" />
                        </span>
                        <span className="text-sm font-semibold">Prodotti con processo certificato</span>
                    </div>
                    <ChevronDown className="size-4 mr-2 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="z-0 -mt-4 space-y-3 p-3 pt-8 border border-input border-t-0 rounded-md">
                    <div className="space-y-3">
                        {c.certifiedProduct && (
                            <ul className="space-y-2">
                                {splitCertifiedProducts(c.certifiedProduct).map((p) => (
                                <li key={p} className="flex items-start gap-2">
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border bg-background">
                                    <BadgeCheck className="size-4 text-primary" />
                                    </span>

                                    <span className="text-sm text-foreground/90 leading-snug">
                                    {p}
                                    </span>
                                </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </CollapsibleContent>
            </Collapsible>
            {c.attachments && c.attachments.length > 0 && (
              <Collapsible className="w-full">
                <CollapsibleTrigger className="z-1 w-full group border border-input rounded-md inline-flex items-center justify-between p-2 text-muted-foreground bg-chart-4">
                    <div className="flex items-center gap-2">
                        <span className="border border-input rounded-md p-1">
                            <Folder className="size-4 text-primary" />
                        </span>
                        <span className="text-sm font-semibold">Documenti</span>
                    </div>
                    <ChevronDown className="size-4 mr-2 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="z-0 -mt-4 space-y-3 p-3 pt-8 border border-input border-t-0 rounded-md">
                    <div className="space-y-3">
                      <ul className="space-y-2">
                          {c.attachments?.length ? (
                                <DocumentListAI companyId={c.id} docs={(c.attachments ?? []).map(a => ({ url: a.url, filename: a.name }))} />
                          ) : null}
                      </ul>
                    </div>
                </CollapsibleContent>
              </Collapsible>
            )}
            </div>
        </div>

        {/* RIGHT: render certificato */}
        <CardContainer className="w-full">
            <CardBody className="group/card flex h-full w-full flex-col items-center justify-center rounded-3xl border border-primary bg-chart-4 p-4 space-y-4 shadow-xl">
                <CardItem className="flex items-center justify-center gap-4">
                <img
                    src='/images/certificazioni/100-made-in-italy-federitaly.webp'
                    alt='Certificato Federitaly 100% Made in Italy'
                    className="h-30 w-30 object-contain"
                />
                </CardItem>
                <CardContent className="w-full space-y-4 p-0">
                    <div className="rounded-xl border bg-muted/30 p-5">
                        <div className="flex">
                            <div className="grid gap-1 w-full">
                                <div className="text-xs opacity-50">Certificazione</div>
                                <div className="text-lg font-semibold">{certTypeLabel(c.certificationType)}</div>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-1">
                            <div className="text-xs opacity-50">Azienda</div>
                            <div className="text-sm font-medium">{c.name}</div>
                        </div>

                    <div className="mt-4 flex">
                            <div className="grid gap-1 w-full">
                                <div className="text-xs opacity-50">Data di rilascio</div>
                                <div className="text-sm font-medium">{formatDateIt(c.issuanceDate)}</div>
                            </div>
                            <div className="grid gap-1 w-full">
                                <div className="text-xs opacity-50">Data di scadenza</div>
                                <div className="text-sm font-medium">{formatDateIt(c.expirationDate)}</div>
                            </div>
                    </div>
                    <div className="mt-4 flex">
                            <div className="grid gap-1 w-full">
                                <div className="text-xs opacity-50">Auditor</div>
                                <div className="text-sm font-medium">{c.auditors ?? "—"}</div>
                            </div>
                            <div className="grid gap-1 w-full">
                                <div className="text-xs opacity-50">ID Certificazione</div>
                                <div className="text-sm font-medium">{c.id}</div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline fasi audit */}
                    <div className="rounded-xl border p-4">
                    <div className="text-sm font-semibold flex items-center gap-2"> 
                        <span className="border border-input rounded-md p-1">
                            <StampIcon className="size-4 text-primary" /> 
                        </span>
                        <span>Fasi di audit</span></div>
                        <div className="mt-2">
                            <TimelineRow label="Pre-analisi (richiesta)" value={formatDateIt(c.preAnalysisRequestDate)} />
                            <TimelineRow label="Pre-analisi (approvazione)" value={formatDateIt(c.preAnalysisApprovalDate)} />
                            <TimelineRow label="Richiesta accesso certificazione" value={formatDateIt(c.certificationAccessRequestDate)} />
                            <TimelineRow label="Audit in azienda" value={formatDateIt(c.companyAuditDate)} />
                        </div>
                    </div>
                </CardContent>
            </CardBody>
        </CardContainer>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
        <div className="w-full col-span-2 lg:pr-16 space-y-4">
            <h2 className="text-3xl">Scopri l'azienda</h2>
            <AboutAI
              companyId={c.id}
              aboutOriginal={c.aboutCompany}
            />
        </div>
        <div className="w-full">
            <ProductGallery images={c.galleryUrls?.map((src) => ({ src }))} />
        </div>
      </div>

      <CompanyLegalInfo
        companyName={c.name}
        vatNumber={c.vatNumber}
        atecoCode={c.ateco}
        chamberOfCommerce={c.chamberOfCommerce}
        registeredOffice={c.registeredOffice}
        operationalHq={c.operationalHq}
      />
      
      <VideoCertification videoUrl={c.videoUrl}/>
    </main>
  );
}