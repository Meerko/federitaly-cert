import { z } from "zod";

// helper: accetta "example.com" e lo normalizza, oppure richiede url valido
export const urlSchema = z
  .string()
  .min(3)
  .transform((v) => v.trim())
  .transform((v) =>
    v.startsWith("http://") || v.startsWith("https://") ? v : `https://${v}`
  )
  .refine((v) => {
    try {
      new URL(v);
      return true;
    } catch {
      return false;
    }
  }, "Inserisci un sito web valido");

export const CertificationFormSchema = z.object({
  certification_type: z.enum(["madein", "hundred"]),

  first_name: z.string().min(2, "Campo obbligatorio"),
  last_name: z.string().min(2, "Campo obbligatorio"),

  company_name: z.string().min(2, "Campo obbligatorio"),
  vat_number: z.string().min(5, "Campo obbligatorio"),
  email: z.string().email("Email non valida"),
  phone: z.string().min(5, "Campo obbligatorio"),

  website: urlSchema,

  street: z.string().min(5, "Campo obbligatorio"),
  postal_code: z.string().min(3, "Campo obbligatorio"),
  city: z.string().min(2, "Campo obbligatorio"),
  province: z.string().min(1, "Campo obbligatorio"),
  country: z.string().min(2, "Campo obbligatorio"),

  sector: z.string().min(1, "Seleziona un settore"),
  production_description: z
    .string()
    .min(30, "Inserisci una descrizione più completa"),

  consent_privacy: z.boolean().refine((v) => v === true, "Consenso richiesto"),
  website_hp: z.string().optional(),
});

export type CertificationFormValues = z.infer<typeof CertificationFormSchema>;