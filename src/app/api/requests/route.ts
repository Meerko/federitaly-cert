import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const SectorEnum = z.enum([
  "ENOGASTRONOMIA",
  "AGRICOLTURA",
  "ALLEVAMENTO",
  "TESSILE",
  "MECCANICA",
  "PELLETTERIA_E_ACCESSORI_MODA",
  "OREFICERIA_E_ARGENTERIA",
  "MOBILI_E_COMPLEMENTI_D_ARREDO",
  "ALTRO",
]);

const Base = z.object({
  type: z.enum(["cert_request", "info"]),
  first_name: z.string().min(2).max(60),
  last_name: z.string().min(2).max(60),
  email: z.string().email().max(200),
  phone: z.string().min(5).max(60),

  company_name: z.string().min(2).max(200),

  street: z.string().min(5).max(200),
  postal_code: z.string().min(3).max(20),
  city: z.string().min(2).max(100),
  province: z.string().min(1).max(50),
  country: z.string().min(2).max(100),

  consent_privacy: z.literal(true),
  source_page: z.string().max(500).optional(),

  // honeypot
  website_hp: z.string().optional(),
});

const InfoSchema = Base.extend({
  type: z.literal("info"),
  message: z.string().min(10).max(4000),
});

const CertSchema = Base.extend({
  type: z.literal("cert_request"),

  certification_type: z.enum(["madein", "hundred"]), // toggle

  vat_number: z.string().min(5).max(40),
  website: z.string().min(3).max(300),
  sector: SectorEnum,
  production_description: z.string().min(30).max(4000),
});

const RequestSchema = z.discriminatedUnion("type", [InfoSchema, CertSchema]);

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    const parsed = RequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation error", details: parsed.error.flatten() }, { status: 400 });
    }

    // honeypot anti-bot
    if (parsed.data.website_hp && parsed.data.website_hp.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const baseInsert: any = {
      type: parsed.data.type,
      status: "new",

      first_name: parsed.data.first_name,
      last_name: parsed.data.last_name,
      email: parsed.data.email,
      phone: parsed.data.phone,

      company_name: parsed.data.company_name,

      street: parsed.data.street,
      postal_code: parsed.data.postal_code,
      city: parsed.data.city,
      province: parsed.data.province,
      country: parsed.data.country,

      consent_privacy: true,
      source_page: parsed.data.source_page ?? null,

      metadata: {},
    };

    let payload: any = baseInsert;

    if (parsed.data.type === "info") {
      payload = {
        ...baseInsert,
        message: parsed.data.message,

        // cert fields
        vat_number: null,
        website: null,
        sector: null,
        production_description: null,
        metadata: { kind: "info" },
      };
    } else {
      payload = {
        ...baseInsert,
        message: null,

        vat_number: parsed.data.vat_number,
        website: parsed.data.website,
        sector: parsed.data.sector,
        production_description: parsed.data.production_description,

        metadata: {
          certification_type: parsed.data.certification_type, // madein | hundred
        },
      };
    }

    const { error } = await supabaseAdmin.from("inbound_requests").insert(payload);
    if (error) {
      return NextResponse.json({ error: "DB insert failed", details: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Request failed", details: err?.message ?? String(err) }, { status: 500 });
  }
}