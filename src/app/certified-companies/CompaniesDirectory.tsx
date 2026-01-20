"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight } from "lucide-react";

type CompanySummary = {
  id: string;
  name: string;
  registeredOffice?: string;
  website?: string;
  expirationDate?: string; // ISO
  thumbnailUrl?: string;
};

type StatusFilter = "all" | "valid" | "expired";

function formatDateIt(iso?: string) {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

function isExpired(iso?: string) {
  if (!iso) return false;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() < Date.now();
}

export default function CompaniesDirectory({
  initialCompanies,
}: {
  initialCompanies: CompanySummary[];
}) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<StatusFilter>("all");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    return initialCompanies.filter((c) => {
      // search: name (puoi aggiungere registeredOffice se vuoi)
      const matchesQuery =
        !q || (c.name ?? "").toLowerCase().includes(q);

      // status filter
      const expired = isExpired(c.expirationDate);
      const matchesStatus =
        status === "all" ||
        (status === "valid" && !expired) ||
        (status === "expired" && expired);

      return matchesQuery && matchesStatus;
    });
  }, [initialCompanies, query, status]);

  const total = initialCompanies.length;
  const shown = filtered.length;

  return (
    <main className="container py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-5xl">Aziende certificate</h1>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 grid gap-3 md:grid-cols-4 items-center">
        <div className="md:col-span-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca per nome azienda…"
          />
        </div>

        <Select value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
          <SelectTrigger>
            <SelectValue placeholder="Stato certificazione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte</SelectItem>
            <SelectItem value="valid">Valide</SelectItem>
            <SelectItem value="expired">Scadute</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground text-right">
          Mostrate:{" "}
          <span className="font-medium text-foreground">{shown}</span>{" "}
          / {total}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const expired = isExpired(c.expirationDate);

          return (
            <Link
                key={c.id}
                href={`/certified-companies/${c.id}`}
                className="rounded-xl border border-input p-4 transition bg-chart-4 hover:shadow-lg/10"
                >
                {c.thumbnailUrl && (
                    <div className="mb-3 aspect-[16/9] overflow-hidden justify-center flex items-center rounded-lg bg-background border border-input">
                    <img
                        src={c.thumbnailUrl}
                        alt={c.name + " logo"}
                        className="w-40 object-fit object-center "
                        loading="lazy"
                    />
                    </div>
                )}

                {/* Nome azienda */}
                <div className="font-medium leading-snug text-balance">
                    {c.name}
                </div>

                {/* Stato certificazione */}
                {c.expirationDate && (
                    <div className="mt-2">
                    <Badge variant={isExpired(c.expirationDate) ? "destructive" : "default"}>
                        {isExpired(c.expirationDate) ? "Scaduta il" : "Valida fino al"} {" "}
                        {formatDateIt(c.expirationDate) ?? "—"}
                    </Badge>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-4 text-sm flex items-center font-medium text-base">
                    Visualizza certificazione <ChevronRight className="size-4" />
                </div>
                </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-xl border p-6 text-sm text-muted-foreground">
          Nessun risultato. Prova a modificare la ricerca o i filtri.
        </div>
      )}
    </main>
  );
}