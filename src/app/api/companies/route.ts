// src/app/api/companies/route.ts
import { NextResponse } from "next/server";
import { fetchCompanyIds, fetchCompanySummary } from "@/lib/prptl";

export const revalidate = 3600;

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += limit) {
    const chunk = items.slice(i, i + limit);
    const chunkResults = await Promise.all(chunk.map(fn));
    results.push(...chunkResults);
  }
  return results;
}

export async function GET() {
  const ids = await fetchCompanyIds();

  const items = await mapWithConcurrency(ids, 10, async (id) => {
    return fetchCompanySummary(id);
  });

  const companies = items.filter(Boolean) as any[];

  companies.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "", "it"));

  return NextResponse.json(companies);
}