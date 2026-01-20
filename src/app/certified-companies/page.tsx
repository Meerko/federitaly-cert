// src/app/certified-companies/page.tsx
import { fetchCompanyIds, fetchCompanySummary, type CompanySummary } from "@/lib/prptl";
import CompaniesDirectory from "./CompaniesDirectory";

async function getCompanies(): Promise<CompanySummary[]> {
  const ids = await fetchCompanyIds();

  const limit = 10;
  const results: CompanySummary[] = [];

  for (let i = 0; i < ids.length; i += limit) {
    const chunk = ids.slice(i, i + limit);
    const chunkResults = await Promise.all(chunk.map((id) => fetchCompanySummary(id)));
    results.push(...(chunkResults.filter(Boolean) as CompanySummary[]));
  }

  results.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "", "it"));
  return results;
}

export default async function CertifiedCompaniesPage() {
  const companies = await getCompanies();

  return <CompaniesDirectory initialCompanies={companies} />;
}