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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import Link from "next/link";

// (facoltativo) telefono: controllo leggero, non troppo aggressivo
const phoneSchema = z
  .string()
  .min(5, "Numero di telefono obbligatorio")
  .max(60)
  .refine((v) => /[0-9]/.test(v), "Inserisci un numero valido");

const FormSchema = z.object({
  first_name: z.string().min(2, "Campo obbligatorio").max(60),
  last_name: z.string().min(2, "Campo obbligatorio").max(60),

  email: z.string().email("Email non valida").max(200),
  phone: phoneSchema,

  company_name: z.string().min(2, "Campo obbligatorio").max(200),

  street: z.string().min(5, "Campo obbligatorio").max(200),
  postal_code: z.string().min(3, "Campo obbligatorio").max(20),
  city: z.string().min(2, "Campo obbligatorio").max(100),
  province: z.string().min(1, "Campo obbligatorio").max(50),
  country: z.string().min(2, "Campo obbligatorio").max(100),

  message: z.string().min(10, "Campo obbligatorio").max(4000),

  consent_privacy: z.boolean().refine((v) => v === true, "Consenso richiesto"),

  // honeypot anti-bot
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

export default function InfoRequestForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      consent_privacy: false,
      website_hp: "",
      country: "Italia",
    },
  });

  const {
    formState: { errors, isSubmitted },
  } = form;

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");

    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "info",
        ...values,
        consent_privacy: true,
        source_page: typeof window !== "undefined" ? window.location.pathname : undefined,
      }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    router.push("/thank-you");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <FieldWithTooltip error={isSubmitted ? errors.first_name?.message : undefined}>
          <Input
            placeholder="Nome*"
            {...form.register("first_name")}
            className={cn(isSubmitted && errors.first_name && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>

        <FieldWithTooltip error={isSubmitted ? errors.last_name?.message : undefined}>
          <Input
            placeholder="Cognome*"
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
        <FieldWithTooltip error={isSubmitted ? errors.email?.message : undefined}>
          <Input
            placeholder="Email*"
            type="email"
            {...form.register("email")}
            className={cn(isSubmitted && errors.email && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>

        <FieldWithTooltip error={isSubmitted ? errors.phone?.message : undefined}>
          <Input
            placeholder="Telefono*"
            {...form.register("phone")}
            className={cn(isSubmitted && errors.phone && "border-red-500 ring-1 ring-red-500")}
          />
        </FieldWithTooltip>
      </div>

      {/* Indirizzo */}
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

      <FieldWithTooltip error={isSubmitted ? errors.message?.message : undefined}>
        <Textarea
          placeholder="Messaggio*"
          rows={6}
          {...form.register("message")}
          className={cn(isSubmitted && errors.message && "border-red-500 ring-1 ring-red-500")}
        />
      </FieldWithTooltip>

      {/* Honeypot */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...form.register("website_hp")}
      />

      {/* Privacy */}
      <FieldWithTooltip error={isSubmitted ? errors.consent_privacy?.message : undefined}>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox
            checked={form.watch("consent_privacy")}
            className="mt-1"
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
        <Send className="size-4" /> {status === "loading" ? "Invio in corso…" : "Invia"}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-700">Errore nell’invio. Riprova tra poco.</p>
      )}
    </form>
  );
}