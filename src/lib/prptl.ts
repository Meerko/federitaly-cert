// src/lib/prptl.ts

/* -------------------------------------------------------------------------- */
/*                                  CANISTERS                                 */
/* -------------------------------------------------------------------------- */

const CANISTERS = {
  "100": "nszbk-7iaaa-aaaap-abczq-cai",     // 100% Made in Italy
  madein: "ql47b-5iaaa-aaaap-ahcqa-cai",    // Made in Italy
} as const;

export type CollectionKey = keyof typeof CANISTERS;

function prptlBase(collection: CollectionKey) {
  return `https://prptl.io/-/${CANISTERS[collection]}`;
}

function rawBase(collection: CollectionKey) {
  return `https://${CANISTERS[collection]}.raw.icp0.io`;
}

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type CertificationType = "100%" | "madeinitaly" | "unknown";

export type CompanySummary = {
  id: string;
  // Nuovo: utile per badge e per capire da dove arrivano i dati
  collection: CollectionKey;
  certificationType: CertificationType;

  name: string;
  registeredOffice?: string;
  website?: string;
  expirationDate?: string; // ISO
  thumbnailUrl?: string; // logo aziendale
};

export type CompanyDetail = {
  id: string;

  // Nuovo
  collection: CollectionKey;
  certificationType: CertificationType;

  name: string;
  aboutCompany?: string;

  registeredOffice?: string;
  operationalHq?: string;

  phone?: string;
  email?: string;
  website?: string;
  social?: string;

  vatNumber?: string;

  activityDescription?: string;
  certifiedProduct?: string;

  // TESTI “PROCESSO”
  certificationProcessText?: string;

  // INFO LEGALI
  fiscalCode?: string;
  ateco?: string;
  chamberOfCommerce?: string;

  productPackaging?: string;

  // Fasi + date
  preAnalysisRequestDate?: string;
  preAnalysisApprovalDate?: string;
  certificationAccessRequestDate?: string;
  companyAuditDate?: string;

  auditors?: string;

  issuanceDate?: string;
  expirationDate?: string;
  publicationDate?: string;

  thumbnailUrl?: string;

  videoUrl?: string;
  galleryUrls?: string[];
  attachments?: { name: string; url: string }[];
};

/* -------------------------------------------------------------------------- */
/*                               PUBLIC FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

/**
 * IDs: se chiamata senza argomenti, ritorna unione delle due collezioni (senza duplicati).
 * Se vuoi solo una collezione: fetchCompanyIds("100") o fetchCompanyIds("madein")
 */
export async function fetchCompanyIds(collection?: CollectionKey): Promise<string[]> {
  if (collection) return fetchCompanyIdsFromCollection(collection);

  const [a, b] = await Promise.all([
    fetchCompanyIdsFromCollection("100"),
    fetchCompanyIdsFromCollection("madein"),
  ]);

  return Array.from(new Set([...a, ...b]));
}

/**
 * Summary: prova 100% -> madein (fallback).
 * Mantiene firma compatibile con il tuo codice attuale.
 */
export async function fetchCompanySummary(id: string): Promise<CompanySummary | null> {
  const s100 = await fetchCompanySummaryFromCollection("100", id);
  if (s100) return s100;

  const smi = await fetchCompanySummaryFromCollection("madein", id);
  if (smi) return smi;

  return null;
}

/**
 * Detail: prova 100% -> madein (fallback).
 * Mantiene firma compatibile con il tuo codice attuale.
 */
export async function fetchCompanyDetail(id: string): Promise<CompanyDetail | null> {
  const d100 = await fetchCompanyDetailFromCollection("100", id);
  if (d100) return d100;

  const dmi = await fetchCompanyDetailFromCollection("madein", id);
  if (dmi) return dmi;

  return null;
}

/**
 * Utile se vuoi forzare una collezione (es. badge / pagine dedicate).
 */
export async function fetchCompanyDetailFromCollection(
  collection: CollectionKey,
  id: string
): Promise<CompanyDetail | null> {
  const text = await fetchInfoText(collection, id);
  if (!text) return null;

  const RAW_BASE = rawBase(collection);

  const name =
    extractLangValue(text, "Company Name", "it") ??
    extractLangValue(text, "Company Name", "en") ??
    "—";

  const registeredOffice =
    extractLangValue(text, "Registered Office", "it") ??
    extractLangValue(text, "Registered Office", "en");

  const operationalHq =
    extractLangValue(text, "Operational HQ & Factory", "it") ??
    extractLangValue(text, "Operational HQ & Factory", "en");

  const phone =
    extractLangValue(text, "Phone Numbers", "it") ??
    extractLangValue(text, "Phone Numbers", "en");

  const email =
    extractLangValue(text, "Email", "it") ??
    extractLangValue(text, "Email", "en");

  const website =
    extractLangValue(text, "Website", "it") ??
    extractLangValue(text, "Website", "en");

  const social =
    extractLangValue(text, "Social Media", "it") ??
    extractLangValue(text, "Social Media", "en");

  const activityDescription =
    extractLangValue(text, "Description of Activities Carried out by the Company", "it") ??
    extractLangValue(text, "Description of Activities Carried out by the Company", "en");

  const certifiedProduct =
    extractLangValue(text, "Certified Product", "it") ??
    extractLangValue(text, "Certified Product", "en");

  const vatNumber =
    extractLangValue(text, "VAT Number", "it") ??
    extractLangValue(text, "VAT Number", "en");

  // About
  const aboutCompany =
    extractLangValue(text, "About Italy is Unique", "it") ??
    extractLangValue(text, "About Italy is Unique", "en");

  // Processo
  const certificationProcessText =
    extractLangValue(text, "Certification Process", "it") ??
    extractLangValue(text, "Certification Process", "en");

  // Info legali
  const fiscalCode =
    extractLangValue(text, "Fiscal Code", "it") ??
    extractLangValue(text, "Fiscal Code", "en");

  const ateco =
    extractLangValue(text, "ATECO Code", "it") ??
    extractLangValue(text, "ATECO Code", "en");

  const chamberOfCommerce =
    extractLangValue(text, "Chamber of Commerce Registration", "it") ??
    extractLangValue(text, "Chamber of Commerce Registration", "en");

  const productPackaging =
    extractLangValue(text, "Product Packaging", "it") ??
    extractLangValue(text, "Product Packaging", "en");

  // Date fasi
  const preAnalysisRequestMs = extractDateMs(text, "Pre-Analysis Date with Pass");
  const preAnalysisApprovalMs = extractDateMs(text, "Pre-Analysis Approval Date / ");
  const certificationAccessRequestMs = extractDateMs(text, "Certification Access Request Date");
  const companyAuditMs = extractDateMs(text, "Company Audit Date");

  const preAnalysisRequestDate =
    typeof preAnalysisRequestMs === "number" ? new Date(preAnalysisRequestMs).toISOString() : undefined;
  const preAnalysisApprovalDate =
    typeof preAnalysisApprovalMs === "number" ? new Date(preAnalysisApprovalMs).toISOString() : undefined;
  const certificationAccessRequestDate =
    typeof certificationAccessRequestMs === "number"
      ? new Date(certificationAccessRequestMs).toISOString()
      : undefined;
  const companyAuditDate =
    typeof companyAuditMs === "number" ? new Date(companyAuditMs).toISOString() : undefined;

  const auditors =
    extractLangValue(text, "Auditors", "it") ??
    extractLangValue(text, "Auditors", "en");

  // Date chiave
  const issuanceMs = extractDateMs(text, "Certification Issuance Date");
  const expirationMs = extractDateMs(text, "Certification Expiration Date");
  const publicationMs = extractDateMs(text, "Publication of Certificate on Blockchain");

  const issuanceDate =
    typeof issuanceMs === "number" ? new Date(issuanceMs).toISOString() : undefined;
  const expirationDate =
    typeof expirationMs === "number" ? new Date(expirationMs).toISOString() : undefined;
  const publicationDate =
    typeof publicationMs === "number" ? new Date(publicationMs).toISOString() : undefined;

  // Logo
  const logoPath = extractFilePath(text, "files-mainImage");
  const thumbnailUrl = logoPath ? `${RAW_BASE}/-/${id}/-/${logoPath}` : undefined;

  // Video
  const videoPath = extractFilePath(text, "files-video");
  const videoUrl = videoPath ? `${RAW_BASE}/-/${id}/-/${videoPath}` : undefined;

  // Gallery (solo immagini)
  const mediaPaths = extractFilePaths(text, "files-media");
  const isImage = (p: string) => /\.(png|jpe?g|webp|gif|svg)$/i.test(p);

  const galleryUrls = mediaPaths
    .filter(isImage)
    .map((p) => `${RAW_BASE}/-/${id}/-/${p}`);

  // Attachments: pointer + library location + fallback library docs
  const attachmentPaths = extractFilePaths(text, "files-attachments");

  let attachments = attachmentPaths
    .map((p) => {
      const key = p.trim();
      return { name: key, url: extractLibraryLocation(text, key) };
    })
    .filter((x) => x.url) as { name: string; url: string }[];

  if (attachments.length === 0) {
    attachments = extractLibraryDocuments(text);
  }

  // Escludi loghi solo se sono immagini
  attachments = attachments.filter((f) => {
    const isLogo = /logo/i.test(f.name);
    const isLogoImage = /\.(png|jpe?g|svg|webp)$/i.test(f.name);
    return !(isLogo && isLogoImage);
  });

  const certificationType: CertificationType =
    collection === "100" ? "100%" : "madeinitaly";

  return {
    id,
    collection,
    certificationType,

    name: safeTrim(name) ?? "—",
    aboutCompany: safeTrim(aboutCompany),

    registeredOffice: safeTrim(registeredOffice),
    operationalHq: safeTrim(operationalHq),

    phone: safeTrim(phone),
    email: safeTrim(email),
    website: normalizeWebsite(safeTrim(website)),
    social: safeTrim(social),

    vatNumber: safeTrim(vatNumber),

    certificationProcessText: safeTrim(certificationProcessText),

    fiscalCode: safeTrim(fiscalCode),
    ateco: safeTrim(ateco),
    chamberOfCommerce: safeTrim(chamberOfCommerce),

    productPackaging: safeTrim(productPackaging),
    activityDescription: safeTrim(activityDescription),
    certifiedProduct: safeTrim(certifiedProduct),

    preAnalysisRequestDate,
    preAnalysisApprovalDate,
    certificationAccessRequestDate,
    companyAuditDate,
    auditors: safeTrim(auditors),

    issuanceDate,
    expirationDate,
    publicationDate,

    thumbnailUrl,
    videoUrl,
    galleryUrls,
    attachments,
  };
}

/**
 * Utile se vuoi forzare una collezione per summary.
 */
export async function fetchCompanySummaryFromCollection(
  collection: CollectionKey,
  id: string
): Promise<CompanySummary | null> {
  const text = await fetchInfoText(collection, id);
  if (!text) return null;

  const RAW_BASE = rawBase(collection);

  const name =
    extractLangValue(text, "Company Name", "it") ??
    extractLangValue(text, "Company Name", "en") ??
    "—";

  const registeredOffice =
    extractLangValue(text, "Registered Office", "it") ??
    extractLangValue(text, "Registered Office", "en");

  const website =
    extractLangValue(text, "Website", "it") ??
    extractLangValue(text, "Website", "en");

  const expirationMs = extractDateMs(text, "Certification Expiration Date");
  const expirationDate =
    typeof expirationMs === "number" ? new Date(expirationMs).toISOString() : undefined;

  const logoPath = extractFilePath(text, "files-mainImage");
  const thumbnailUrl = logoPath ? `${RAW_BASE}/-/${id}/-/${logoPath}` : undefined;

  const certificationType: CertificationType =
    collection === "100" ? "100%" : "madeinitaly";

  return {
    id,
    collection,
    certificationType,
    name: safeTrim(name) ?? "—",
    registeredOffice: safeTrim(registeredOffice),
    website: normalizeWebsite(safeTrim(website)),
    expirationDate,
    thumbnailUrl,
  };
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL HELPERS                             */
/* -------------------------------------------------------------------------- */

async function fetchCompanyIdsFromCollection(collection: CollectionKey): Promise<string[]> {
  const base = prptlBase(collection);

  const res = await fetch(`${base}/collection`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch company IDs (${collection}): ${res.status}`);

  const json = await res.json();
  if (!Array.isArray(json)) return [];

  return json
    .map((x: any) => (typeof x === "string" ? x : x?.id ?? x?.token_id ?? x?.tokenId))
    .filter((x: any) => typeof x === "string" && x.length > 0);
}

/**
 * Fetch raw /info text (NO JSON.parse).
 */
async function fetchInfoText(collection: CollectionKey, id: string): Promise<string | null> {
  const base = prptlBase(collection);
  const res = await fetch(`${base}/-/${id}/info`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  return res.text();
}

/* -----------------------------
   Extractors (tolerant)
----------------------------- */

function safeTrim(v?: string | null) {
  if (!v) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

function normalizeWebsite(raw?: string) {
  if (!raw) return undefined;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Robust lang extractor (handles quotes inside).
 */
function extractLangValue(text: string, fieldName: string, lang: "it" | "en"): string | undefined {
  const fieldRe = new RegExp(`"${escapeRegExp(fieldName)}"\\s*:\\s*\\{`, "i");
  const fieldMatch = fieldRe.exec(text);
  if (!fieldMatch) return undefined;

  const start = fieldMatch.index;
  const windowText = text.slice(start, start + 25000);

  const langRe = new RegExp(`"${lang}"\\s*:\\s*"`, "i");
  const langMatch = langRe.exec(windowText);
  if (!langMatch) return undefined;

  let i = langMatch.index + langMatch[0].length;

  let out = "";
  while (i < windowText.length) {
    const ch = windowText[i];

    if (ch === "\\") {
      const next = windowText[i + 1];
      if (next) {
        out += ch + next;
        i += 2;
        continue;
      }
    }

    if (ch === '"') {
      let k = i + 1;
      while (k < windowText.length && /\s/.test(windowText[k])) k++;
      const nextNonWs = k < windowText.length ? windowText[k] : "";

      if (nextNonWs === "," || nextNonWs === "}" || nextNonWs === "]") {
        return out;
      }

      out += '"';
      i += 1;
      continue;
    }

    out += ch;
    i += 1;
  }

  return out || undefined;
}

function extractDateMs(text: string, fieldName: string): number | undefined {
  const re = new RegExp(
    `"${escapeRegExp(fieldName)}"\\s*:\\s*\\{[\\s\\S]*?"content"\\s*:\\s*\\{[\\s\\S]*?"date"\\s*:\\s*(\\d+)`,
    "i"
  );
  const m = text.match(re);
  if (!m?.[1]) return undefined;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * First file path in files-*
 */
function extractFilePath(text: string, pointerName: string): string | undefined {
  const re = new RegExp(
    `"${escapeRegExp(pointerName)}"\\s*:\\s*\\[\\s*\\{[\\s\\S]*?"path"\\s*:\\s*"([^"]+)"`,
    "i"
  );
  const m = text.match(re);
  return m?.[1];
}

/**
 * Multiple file paths in files-*
 */
function extractFilePaths(text: string, pointerName: string): string[] {
  const startRe = new RegExp(`"${escapeRegExp(pointerName)}"\\s*:\\s*\\[`, "i");
  const startMatch = startRe.exec(text);
  if (!startMatch) return [];

  // bracket matching (robusto)
  const bracketStart = text.indexOf("[", startMatch.index);
  if (bracketStart === -1) return [];

  let depth = 0;
  let endIndex = bracketStart;

  for (let i = bracketStart; i < text.length; i++) {
    if (text[i] === "[") depth++;
    if (text[i] === "]") {
      depth--;
      if (depth === 0) {
        endIndex = i;
        break;
      }
    }
  }

  const arrayBlock = text.slice(bracketStart, endIndex + 1);

  const pathRe = /"path"\s*:\s*"([^"]+)"/g;
  const paths: string[] = [];
  let m: RegExpExecArray | null;

  while ((m = pathRe.exec(arrayBlock))) {
    paths.push(m[1].trim());
  }

  return Array.from(new Set(paths));
}

function extractLibraryLocation(text: string, filename: string): string | undefined {
  const key = escapeRegExp(filename.trim());

  const re1 = new RegExp(
    `"filename"\\s*:\\s*"${key}"[\\s\\S]*?"location"\\s*:\\s*"([^"]+)"`,
    "i"
  );
  const m1 = text.match(re1);
  if (m1?.[1]) return m1[1];

  const re2 = new RegExp(
    `"library_id"\\s*:\\s*"${key}"[\\s\\S]*?"location"\\s*:\\s*"([^"]+)"`,
    "i"
  );
  const m2 = text.match(re2);
  return m2?.[1];
}

function extractLibraryDocuments(text: string): { name: string; url: string }[] {
  const docExt = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar)$/i;
  const re = /"filename"\s*:\s*"([^"]+)"[\s\S]*?"location"\s*:\s*"([^"]+)"/g;

  const out: { name: string; url: string }[] = [];
  let m: RegExpExecArray | null;

  while ((m = re.exec(text))) {
    const filename = (m[1] || "").trim();
    const location = m[2];
    if (docExt.test(filename)) out.push({ name: filename, url: location });
  }

  return Array.from(new Map(out.map((x) => [x.url, x])).values());
}