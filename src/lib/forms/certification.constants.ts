import type { CertificationFormValues } from "./certification.schema";

export const SECTORS = [
  { value: "ENOGASTRONOMIA", label: "Enogastronomia" },
  { value: "AGRICOLTURA", label: "Agricoltura" },
  { value: "ALLEVAMENTO", label: "Allevamento" },
  { value: "TESSILE", label: "Tessile" },
  { value: "MECCANICA", label: "Meccanica" },
  { value: "PELLETTERIA_E_ACCESSORI_MODA", label: "Pelletteria e accessori moda" },
  { value: "OREFICERIA_E_ARGENTERIA", label: "Oreficeria e argenteria" },
  { value: "MOBILI_E_COMPLEMENTI_D_ARREDO", label: "Mobili e complementi d'arredo" },
  { value: "ALTRO", label: "Altro" },
] as const;

export function detectDefaultTypeFromPath(path: string): "madein" | "hundred" {
  const p = (path || "").toLowerCase();
  if (p.includes("100") || p.includes("100-made") || p.includes("100%")) return "hundred";
  if (p.includes("made-in-italy") || p.includes("madein")) return "madein";
  return "madein";
}

export const STEP_FIELDS: Record<number, (keyof CertificationFormValues)[]> = {
  0: ["certification_type", "first_name", "last_name"],
  1: ["company_name", "vat_number", "email", "phone", "website"],
  2: [
    "street",
    "postal_code",
    "city",
    "province",
    "country",
    "sector",
    "production_description",
    "consent_privacy",
  ],
};

export const errClass = (hasErr?: boolean) =>
  hasErr ? "border-red-500 ring-1 ring-red-500" : "";