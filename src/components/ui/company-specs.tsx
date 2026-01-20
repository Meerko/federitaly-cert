"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { ChevronDown, BadgeCheck, Info, ClipboardList, Scale } from "lucide-react";

type Spec = {
  label: string;
  value: React.ReactNode; // ✅ ReactNode, non string
};

type SpecCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  specs: Spec[];
};

export type CompanySpecsData = {
  aboutCompany?: string;               // About Italy is Unique
  certificationProcessText?: string;   // Certification Process (testone)
  certifiedProduct?: string;           // lista prodotti (stringa grezza)
  vatNumber?: string;
  fiscalCode?: string;
  ateco?: string;
  chamberOfCommerce?: string;
  registeredOffice?: string;
  operationalHq?: string;
};

function normalizeParagraphs(text?: string): string[] {
  if (!text) return [];
  const cleaned = text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Se non ci sono newline, spezza in paragrafi “soft”
  const withParas = cleaned.includes("\n")
    ? cleaned
    : cleaned.replace(/([.!?])\s+(?=[A-ZÀ-ÖÙ-Þ])/g, "$1\n\n");

  return withParas
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

function splitCertifiedProducts(text?: string): string[] {
  if (!text) return [];
  const t = text.replace(/\r\n/g, "\n").trim();

  // prova splitter “robusti” (nei tuoi dataset è spesso un casino)
  const candidates = t
    .split(/\n+|;|\s\.\s|\s{2,}/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const list = candidates.length > 1
    ? candidates
    : t.split(/\.\s+/g).map((s) => s.trim()).filter(Boolean);

  return Array.from(new Set(list)).slice(0, 50);
}

function RichText({ text }: { text?: string }) {
  const paragraphs = useMemo(() => normalizeParagraphs(text), [text]);
  if (!paragraphs.length) return <span className="text-muted-foreground">—</span>;

  return (
    <div className="space-y-3">
      {paragraphs.map((p, idx) => (
        <p key={idx} className="text-sm leading-relaxed text-muted-foreground">
          {p}
        </p>
      ))}
    </div>
  );
}

function ProductsList({ text }: { text?: string }) {
  const products = useMemo(() => splitCertifiedProducts(text), [text]);
  if (!products.length) return <span className="text-muted-foreground">—</span>;

  return (
    <ul className="space-y-2">
      {products.map((p) => (
        <li key={p} className="flex items-start gap-2">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border bg-background">
            <BadgeCheck className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm leading-snug text-muted-foreground">{p}</span>
        </li>
      ))}
    </ul>
  );
}

type Props = {
  data: CompanySpecsData;
  title?: string;
  className?: string;
};

export function CompanySpecs({
  data,
  title = "Dettagli",
  className,
}: Props) {
  const categories: SpecCategory[] = useMemo(() => {
    return [
      {
        id: "about",
        name: "About",
        icon: <Info className="size-4" />,
        specs: [
          {
            label: "Descrizione azienda",
            value: <RichText text={data.aboutCompany} />,
          },
        ],
      },
      {
        id: "process",
        name: "Processo produttivo certificato",
        icon: <ClipboardList className="size-4" />,
        specs: [
          {
            label: "Processo",
            value: <RichText text={data.certificationProcessText} />,
          },
        ],
      },
      {
        id: "products",
        name: "Prodotti certificati",
        icon: <BadgeCheck className="size-4" />,
        specs: [
          {
            label: "Elenco prodotti",
            value: <ProductsList text={data.certifiedProduct} />,
          },
        ],
      },
      {
        id: "legal",
        name: "Info / dati legali",
        icon: <Scale className="size-4" />,
        specs: [
          { label: "Partita IVA", value: data.vatNumber || <span className="text-muted-foreground">—</span> },
          { label: "Codice fiscale", value: data.fiscalCode || <span className="text-muted-foreground">—</span> },
          { label: "ATECO", value: data.ateco || <span className="text-muted-foreground">—</span> },
          { label: "CCIAA", value: data.chamberOfCommerce || <span className="text-muted-foreground">—</span> },
          { label: "Sede legale", value: data.registeredOffice || <span className="text-muted-foreground">—</span> },
          { label: "Sede operativa", value: data.operationalHq || <span className="text-muted-foreground">—</span> },
        ],
      },
    ];
  }, [data]);

  const [openCategories, setOpenCategories] = useState<string[]>(
    categories.map((c) => c.id)
  );

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenCategories(categories.map((c) => c.id));
  const collapseAll = () => setOpenCategories([]);

  return (
    <section className={cn("py-6", className)}>
      <div className="w-full">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((category) => (
            <Collapsible
              key={category.id}
              open={openCategories.includes(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <div className="rounded-lg border">
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                      {category.icon}
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-5 text-muted-foreground transition-transform",
                      openCategories.includes(category.id) && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="border-t">
                    <Table>
                      <TableBody>
                        {category.specs.map((spec, index) => (
                          <TableRow key={index} className="hover:bg-transparent">
                            <TableCell className="py-3">
                              <div className="font-medium">{spec.value}</div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}