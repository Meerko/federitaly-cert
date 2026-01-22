"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import Link from "next/link";
import { track } from "@/lib/ga";

const Sector = [
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

// helper: accetta "example.com" e lo normalizza, oppure richiede url valido
const urlSchema = z
  .string()
  .min(3)
  .transform((v) => v.trim())
  .transform((v) => (v.startsWith("http://") || v.startsWith("https://") ? v : `https://${v}`))
  .refine((v) => {
    try {
      new URL(v);
      return true;
    } catch {
      return false;
    }
  }, "Inserisci un sito web valido");

const FormSchema = z.object({
  certification_type: z.enum(["madein", "hundred"]),

  first_name: z.string().min(2, "Campo obbligatorio"),
  last_name: z.string().min(2, "Campo obbligatorio"),

  company_name: z.string().min(2, "Campo obbligatorio"),
  vat_number: z.string().min(5, "Campo obbligatorio"),
  email: z.string().email("Email non valida"),
  phone: z.string().min(5, "Campo obbligatorio"),

  website: urlSchema, // ✅ validazione url

  street: z.string().min(5, "Campo obbligatorio"),
  postal_code: z.string().min(3, "Campo obbligatorio"),
  city: z.string().min(2, "Campo obbligatorio"),
  province: z.string().min(1, "Campo obbligatorio"),
  country: z.string().min(2, "Campo obbligatorio"),

  sector: z.string().min(1, "Seleziona un settore"),
  production_description: z.string().min(30, "Inserisci una descrizione più completa"),

  consent_privacy: z.boolean().refine((v) => v === true, "Consenso richiesto"),
  website_hp: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

function FieldWithTooltip({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) {
  if (!error) return <>{children}</>;

  return (
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="top" align="start">
          {error}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function CertificationRequestForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      certification_type: "madein",
      consent_privacy: false,
      website_hp: "",
      sector: "",
      country: "Italia",
    },
  });

  const {
    formState: { errors, isSubmitted },
  } = form;

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");

    track("form_submit_attempt", {
      form_type: "cert_request",
      certification_type: values.certification_type,
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    });

    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "cert_request",
        ...values,
        consent_privacy: true,
        source_page: typeof window !== "undefined" ? window.location.pathname : undefined,
      }),
    });

    if (!res.ok) {
      setStatus("error");
      track("form_submit_error", {
        form_type: "cert_request",
        certification_type: values.certification_type,
        page_path: typeof window !== "undefined" ? window.location.pathname : "",
      });
  
      return;
    }

    track("form_submit_success", {
      form_type: "cert_request",
      certification_type: values.certification_type,
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    });
    // ✅ redirect thank you
    router.push("/thank-you");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Tabs
        value={form.watch("certification_type")}
        onValueChange={(v) =>
          form.setValue("certification_type", v as any, { shouldValidate: true })
        }
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="madein">Made in Italy</TabsTrigger>
          <TabsTrigger value="hundred">100% Made in Italy</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-3 md:grid-cols-2">
        <FieldWithTooltip error={isSubmitted ? errors.first_name?.message : undefined}>
          <Input
            placeholder="Nome referente*"
            {...form.register("first_name")}
            className={cn(isSubmitted && errors.first_name && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>

        <FieldWithTooltip error={isSubmitted ? errors.last_name?.message : undefined}>
          <Input
            placeholder="Cognome referente*"
            {...form.register("last_name")}
            className={cn(isSubmitted && errors.last_name && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>
      </div>

      <FieldWithTooltip error={isSubmitted ? errors.company_name?.message : undefined}>
        <Input
          placeholder="Ragione sociale azienda*"
          {...form.register("company_name")}
          className={cn(isSubmitted && errors.company_name && "border-red-500 ring-1 ring-red-500")}
        />
      </FieldWithTooltip>

      <div className="grid gap-3 md:grid-cols-2">
        <FieldWithTooltip error={isSubmitted ? errors.vat_number?.message : undefined}>
          <Input
            placeholder="Partita IVA*"
            {...form.register("vat_number")}
            className={cn(isSubmitted && errors.vat_number && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>

        <FieldWithTooltip error={isSubmitted ? errors.email?.message : undefined}>
          <Input
            placeholder="Email*"
            type="email"
            {...form.register("email")}
            className={cn(isSubmitted && errors.email && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <FieldWithTooltip error={isSubmitted ? errors.phone?.message : undefined}>
          <Input
            placeholder="Telefono*"
            {...form.register("phone")}
            className={cn(isSubmitted && errors.phone && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>

        <FieldWithTooltip error={isSubmitted ? errors.website?.message : undefined}>
          <Input
            placeholder="Sito web*"
            {...form.register("website")}
            className={cn(isSubmitted && errors.website && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <FieldWithTooltip error={isSubmitted ? errors.street?.message : undefined}>
          <Input
            placeholder="Via / Indirizzo*"
            {...form.register("street")}
            className={cn(isSubmitted && errors.street && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>

        <FieldWithTooltip error={isSubmitted ? errors.postal_code?.message : undefined}>
          <Input
            placeholder="CAP*"
            {...form.register("postal_code")}
            className={cn(isSubmitted && errors.postal_code && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <FieldWithTooltip error={isSubmitted ? errors.city?.message : undefined}>
          <Input
            placeholder="Città / Comune*"
            {...form.register("city")}
            className={cn(isSubmitted && errors.city && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>

        <FieldWithTooltip error={isSubmitted ? errors.province?.message : undefined}>
          <Input
            placeholder="Provincia*"
            {...form.register("province")}
            className={cn(isSubmitted && errors.province && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>
      </div>

      <FieldWithTooltip error={isSubmitted ? errors.country?.message : undefined}>
        <Input
          placeholder="Nazione*"
          {...form.register("country")}
          className={cn(isSubmitted && errors.country && "border-red-500 ring-1 ring-red-500")}
        />
      </FieldWithTooltip>

      {/* Settore */}
      <FieldWithTooltip error={isSubmitted ? errors.sector?.message : undefined}>
        <div className={cn(isSubmitted && errors.sector && "rounded-md ring-1 ring-red-500")}>
          <Select
            value={form.watch("sector")}
            onValueChange={(v) => form.setValue("sector", v, { shouldValidate: true })}
          >
            <SelectTrigger className={cn(isSubmitted && errors.sector && "border-red-500")}>
              <SelectValue placeholder="Settore di produzione*" />
            </SelectTrigger>
            <SelectContent>
              {Sector.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FieldWithTooltip>

      <FieldWithTooltip error={isSubmitted ? errors.production_description?.message : undefined}>
        <Textarea
          placeholder="Descrivi i tuoi prodotti e il ciclo di produzione*"
          rows={6}
          {...form.register("production_description")}
          className={cn(isSubmitted && errors.production_description && "border-red-500 ring-1 ring-red-500")}
        />
      </FieldWithTooltip>

      {/* Honeypot */}
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("website_hp")} />

      {/* Privacy */}
      <FieldWithTooltip error={isSubmitted ? errors.consent_privacy?.message : undefined}>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox
            checked={form.watch("consent_privacy")}
            onCheckedChange={(v) =>
              form.setValue("consent_privacy", v === true, { shouldValidate: true })
            }
          />
          <span>
            Autorizzo il trattamento dei dati dichiarando di aver preso visione dell&apos;informativa sulla <Link href="/privacy-policy" className="text-primary underline">privacy</Link>.
          </span>
        </label>
      </FieldWithTooltip>

      <Button type="submit" disabled={status === "loading"}>
        <Send className="size-4" /> {status === "loading" ? "Invio in corso…" : "Invia richiesta"}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-700">Errore nell’invio. Riprova tra poco.</p>
      )}
    </form>
  );
}