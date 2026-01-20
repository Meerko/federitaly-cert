// src/components/company/company-legal-info-with-map.tsx

import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

interface CompanyLegalInfoWithMapProps {
  companyName: string;
  vatNumber?: string;
  atecoCode?: string;
  chamberOfCommerce?: string;
  registeredOffice?: string;
  operationalHq?: string;
  otherOperationalOffices?: string;
  className?: string;
}

const Row = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => {
  if (!value) return null;

  return (
    <div className="">
      <div className="text-xs opacity-50">
        {label}
      </div>
      <div className="text-sm font-medium">
        {value}
      </div>
    </div>
  );
};

function buildGoogleMapsEmbed(address?: string) {
  if (!address) return null;
  const encoded = encodeURIComponent(address);
  return `https://www.google.com/maps?q=${encoded}&output=embed`;
}

export function CompanyLegalInfo({
  companyName,
  vatNumber,
  atecoCode,
  chamberOfCommerce,
  registeredOffice,
  operationalHq,
  otherOperationalOffices,
  className,
}: CompanyLegalInfoWithMapProps) {
  const mapSrc = buildGoogleMapsEmbed(registeredOffice);

  return (
    <section
      className={cn(
        "rounded-xl border border-input bg-background p-4 space-y-4",
        className
      )}
    >
        <div className="flex items-center gap-2">
            <span className="border border-input rounded-md p-1">
                <BookOpen className="size-4 text-primary" />
            </span>
            <span className="text-sm font-semibold">
                Informazioni legali
            </span>
        </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* COLONNA SINISTRA — DATI */}
        <div className="space-y-4 col-span-1">
          <Row
            label="Ragione sociale"
            value={companyName}
          />

          <Row
            label="Partita IVA"
            value={vatNumber}
          />
          <div className="flex gap-8">
            <Row
              label="Codice ATECO"
              value={atecoCode}
            />

            <Row
              label="Iscrizione Camera di Commercio"
              value={chamberOfCommerce}
            />
          </div>

          <Row
            label="Sede legale"
            value={registeredOffice}
          />

          <Row
            label="Sede operativa"
            value={operationalHq}
          />

          <Row
            label="Altre sedi operative"
            value={otherOperationalOffices}
          />
        </div>

        {/* COLONNA DESTRA — MAPPA */}
        <div className="relative h-30 overflow-hidden rounded-lg border bg-muted col-span-1 lg:col-span-2 md:hidden">
          {mapSrc ? (
            <iframe
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
              aria-label="Mappa sede legale"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Mappa non disponibile
            </div>
          )}
        </div>
        <div className="relative h-[360px] overflow-hidden rounded-lg border bg-muted col-span-1 lg:col-span-2 md:visible">
          {mapSrc ? (
            <iframe
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
              aria-label="Mappa sede legale"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Mappa non disponibile
            </div>
          )}
        </div>
      </div>
    </section>
  );
}