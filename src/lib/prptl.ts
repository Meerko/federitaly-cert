// src/lib/prptl.ts

export const PRPTL_BASE = "https://prptl.io/-/nszbk-7iaaa-aaaap-abczq-cai";

// canister raw domain (per asset)
const CANISTER_ID = "nszbk-7iaaa-aaaap-abczq-cai";
const RAW_BASE = `https://${CANISTER_ID}.raw.icp0.io`;

export type CertificationType = "100%" | "madeinitaly" | "unknown";

export type CompanySummary = {
  id: string;
  name: string;
  registeredOffice?: string;
  website?: string;
  expirationDate?: string; // ISO
  thumbnailUrl?: string; // logo aziendale
};

export type CompanyDetail = {
  id: string;
  name: string;
  aboutCompany?: string;

  registeredOffice?: string;
  operationalHq?: string;

  phone?: string;
  email?: string;
  website?: string;
  social?: string;

  vatNumber?: string;
  certificationType?: CertificationType;

  activityDescription?: string;
  certifiedProduct?: string;

  // TESTI “PROCESSO”
  certificationProcessText?: string;     // Certification Process

  // INFO LEGALI (per tab “Info / dati legali”)
  fiscalCode?: string;                   // Fiscal Code
  ateco?: string;                        // ATECO Code
  chamberOfCommerce?: string;            // Chamber of Commerce Registration

  // EXTRA (opzionale, ma utile)
  productPackaging?: string;             // Product Packaging

  // Fasi + date
  preAnalysisRequestDate?: string;      // Pre-Analysis Date with Pass
  preAnalysisApprovalDate?: string;     // Pre-Analysis Approval Date / 
  certificationAccessRequestDate?: string;
  companyAuditDate?: string;

  auditors?: string;

  issuanceDate?: string;                // Certification Issuance Date
  expirationDate?: string;              // Certification Expiration Date
  publicationDate?: string;             // Publication of Certificate on Blockchain

  thumbnailUrl?: string; // logo aziendale

  videoUrl?: string;
  galleryUrls?: string[];
  attachments?: { name: string; url: string }[];
};

export async function fetchCompanyIds(): Promise<string[]> {
  const res = await fetch(`${PRPTL_BASE}/collection`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch company IDs: ${res.status}`);

  const json = await res.json();
  if (!Array.isArray(json)) return [];

  // supports: ["id", ...] OR [{id:"..."}, ...]
  return json
    .map((x: any) => (typeof x === "string" ? x : x?.id ?? x?.token_id ?? x?.tokenId))
    .filter((x: any) => typeof x === "string" && x.length > 0);
}

/**
 * Fetch raw /info text.
 * We DO NOT JSON.parse this payload because PRPTL frequently returns invalid JSON.
 */
async function fetchInfoText(id: string): Promise<string | null> {
  const res = await fetch(`${PRPTL_BASE}/-/${id}/info`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  return res.text();
}

export async function fetchCompanySummary(id: string): Promise<CompanySummary | null> {
  const text = await fetchInfoText(id);
  if (!text) return null;

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

  // ✅ logo aziendale via raw url
  const logoPath = extractFilePath(text, "files-mainImage");
  const thumbnailUrl = logoPath ? `${RAW_BASE}/-/${id}/-/${logoPath}` : undefined;

  return {
    id,
    name: safeTrim(name) ?? "—",
    registeredOffice: safeTrim(registeredOffice),
    website: normalizeWebsite(safeTrim(website)),
    expirationDate,
    thumbnailUrl,
  };
}

export async function fetchCompanyDetail(id: string): Promise<CompanyDetail | null> {
  const text = await fetchInfoText(id);
  if (!text) return null;

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

    // ✅ ABOUT (testo lungo)
    const aboutCompany =
    extractLangValue(text, "About Italy is Unique", "it") ??
    extractLangValue(text, "About Italy is Unique", "en");

  // ✅ PROCESSO CERTIFICATO (testo lungo)
  const certificationProcessText =
    extractLangValue(text, "Certification Process", "it") ??
    extractLangValue(text, "Certification Process", "en");

  // ✅ INFO LEGALI
  const fiscalCode =
    extractLangValue(text, "Fiscal Code", "it") ??
    extractLangValue(text, "Fiscal Code", "en");

  const ateco =
    extractLangValue(text, "ATECO Code", "it") ??
    extractLangValue(text, "ATECO Code", "en");

  const chamberOfCommerce =
    extractLangValue(text, "Chamber of Commerce Registration", "it") ??
    extractLangValue(text, "Chamber of Commerce Registration", "en");

  // ✅ (opzionale) Packaging
  const productPackaging =
    extractLangValue(text, "Product Packaging", "it") ??
    extractLangValue(text, "Product Packaging", "en");

  // Tipo certificazione: euristica (migliorabile se c’è un campo dedicato)
  const certificationType: CertificationType = /100%\s*made\s*in\s*italy/i.test(text)
    ? "100%"
    : /made\s*in\s*italy/i.test(text)
      ? "madeinitaly"
      : "unknown";

  // Fasi con date
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

  // ✅ logo aziendale via raw url
  const logoPath = extractFilePath(text, "files-mainImage");
  const thumbnailUrl = logoPath ? `${RAW_BASE}/-/${id}/-/${logoPath}` : undefined;

  const videoPath = extractFilePath(text, "files-video");
  const videoUrl = videoPath ? `${RAW_BASE}/-/${id}/-/${videoPath}` : undefined;

  const mediaPaths = extractFilePaths(text, "files-media");
  const isImage = (p: string) => /\.(png|jpe?g|webp|gif|svg)$/i.test(p);

  const galleryUrls = mediaPaths
    .filter(isImage)
    .map((p) => `${RAW_BASE}/-/${id}/-/${p}`);

  const attachmentPaths = extractFilePaths(text, "files-attachments");

  let attachments = attachmentPaths
    .map((p) => {
      const key = p.trim();
      return { name: key, url: extractLibraryLocation(text, key) };
    })
    .filter((x) => x.url) as { name: string; url: string }[];

    // fallback se vuoto
    if (attachments.length === 0) {
      attachments = extractLibraryDocuments(text);
    }

    // ✅ escludi loghi
    attachments = attachments.filter((f) => !/logo/i.test(f.name));


  return {
    id,
    name: safeTrim(name) ?? "—",
    aboutCompany: safeTrim(aboutCompany),
    registeredOffice: safeTrim(registeredOffice),
    operationalHq: safeTrim(operationalHq),
    phone: safeTrim(phone),
    email: safeTrim(email),
    website: normalizeWebsite(safeTrim(website)),
    social: safeTrim(social),

    vatNumber: safeTrim(vatNumber),
    certificationType,

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
 * Looks for:
 * "FIELD": { ... "content": { "it": "VALUE" ... } }
 * It's intentionally tolerant and stops at the first quote.
 */
function extractLangValue(
  text: string,
  fieldName: string,
  lang: "it" | "en"
): string | undefined {
  // 1) trova l'inizio del blocco del campo ("Certification Process": { ... })
  const fieldRe = new RegExp(`"${escapeRegExp(fieldName)}"\\s*:\\s*\\{`, "i");
  const fieldMatch = fieldRe.exec(text);
  if (!fieldMatch) return undefined;

  // Limitiamo la ricerca per evitare di matchare altre parti del JSON
  const start = fieldMatch.index;
  const windowText = text.slice(start, start + 20000); // window ampia per testi lunghi

  // 2) trova l’inizio del valore:  "it": "
  const langRe = new RegExp(`"${lang}"\\s*:\\s*"`, "i");
  const langMatch = langRe.exec(windowText);
  if (!langMatch) return undefined;

  let i = langMatch.index + langMatch[0].length; // posizione subito dopo l’apertura "

  // 3) leggi fino alla fine stringa, MA permetti virgolette interne
  //    Una virgoletta chiude la stringa SOLO se dopo c’è , oppure } oppure ] (dopo eventuali spazi)
  let out = "";
  while (i < windowText.length) {
    const ch = windowText[i];

    if (ch === "\\") {
      // conserva escape sequences standard
      const next = windowText[i + 1];
      if (next) {
        out += ch + next;
        i += 2;
        continue;
      }
    }

    if (ch === '"') {
      // lookahead al prossimo carattere non-whitespace
      let k = i + 1;
      while (k < windowText.length && /\s/.test(windowText[k])) k++;
      const nextNonWs = k < windowText.length ? windowText[k] : "";

      // chiusura reale della stringa
      if (nextNonWs === "," || nextNonWs === "}" || nextNonWs === "]") {
        return out;
      }

      // altrimenti è una virgoletta interna: la teniamo
      out += '"';
      i += 1;
      continue;
    }

    out += ch;
    i += 1;
  }

  return out || undefined;
}

/**
 * "FIELD": { ... "content": { "date": 1759269600000 } }
 */
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
 * Estrae il path del logo dal blocco files-mainImage.
 * "files-mainImage": [ { ... "path": "l1.jpg" } ]
 */
function extractFilePath(text: string, pointerName: string): string | undefined {
  const re = new RegExp(
    `"${escapeRegExp(pointerName)}"\\s*:\\s*\\[\\s*\\{[\\s\\S]*?"path"\\s*:\\s*"([^"]+)"`,
    "i"
  );
  const m = text.match(re);
  return m?.[1];
}

function extractFilePaths(text: string, pointerName: string): string[] {
  const startRe = new RegExp(`"${escapeRegExp(pointerName)}"\\s*:\\s*\\[`, "i");
  const startMatch = startRe.exec(text);
  if (!startMatch) return [];

  // finestra ampia dopo l’inizio dell’array (di solito basta)
  const startIndex = startMatch.index;
  const windowText = text.slice(startIndex, startIndex + 30000);

  const pathRe = /"path"\s*:\s*"([^"]+)"/g;
  const paths: string[] = [];
  let m: RegExpExecArray | null;

  while ((m = pathRe.exec(windowText))) {
    paths.push(m[1]);
  }

  return Array.from(new Set(paths));
}

function extractLibraryLocation(text: string, filename: string): string | undefined {
  const key = escapeRegExp(filename.trim());

  // prova match su filename
  const re1 = new RegExp(
    `"filename"\\s*:\\s*"${key}"[\\s\\S]*?"location"\\s*:\\s*"([^"]+)"`,
    "i"
  );
  const m1 = text.match(re1);
  if (m1?.[1]) return m1[1];

  // fallback: prova match su library_id
  const re2 = new RegExp(
    `"library_id"\\s*:\\s*"${key}"[\\s\\S]*?"location"\\s*:\\s*"([^"]+)"`,
    "i"
  );
  const m2 = text.match(re2);
  return m2?.[1];
}

function extractLibraryDocuments(
  text: string
): { name: string; url: string }[] {
  const docExt = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar)$/i;

  const re =
    /"filename"\s*:\s*"([^"]+)"[\s\S]*?"location"\s*:\s*"([^"]+)"/g;

  const out: { name: string; url: string }[] = [];
  let m: RegExpExecArray | null;

  while ((m = re.exec(text))) {
    const filename = m[1];
    const location = m[2];

    if (docExt.test(filename)) {
      out.push({ name: filename, url: location });
    }
  }

  // rimuove duplicati
  return Array.from(new Map(out.map((x) => [x.url, x])).values());
}
