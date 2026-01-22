"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { track } from "@/lib/ga";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

import {
  CertificationFormSchema,
  type CertificationFormValues,
} from "@/lib/forms/certification.schema";

import {
  SECTORS,
  detectDefaultTypeFromPath,
  errClass,
  STEP_FIELDS,
} from "@/lib/forms/certification.constants";

export default function CertificationRequestForm({
  defaultType,
}: {
  defaultType?: "madein" | "hundred";
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [formError, setFormError] = useState<string | null>(null);

  // 👇 controlla quando mostrare bordi rossi
  const [showErrors, setShowErrors] = useState(false);

  const autoDefaultType = useMemo(
    () => defaultType ?? detectDefaultTypeFromPath(pathname || ""),
    [defaultType, pathname]
  );

  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(CertificationFormSchema),
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
    formState: { errors },
  } = form;

  // Auto-imposta tipo certificazione in base alla pagina (se serve)
  useEffect(() => {
    const current = form.getValues("certification_type");
    if (current !== autoDefaultType) {
      form.setValue("certification_type", autoDefaultType, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDefaultType]);

  // ✅ evidenzia SOLO i campi dello step corrente
  const isFieldInCurrentStep = (name: keyof CertificationFormValues) =>
    STEP_FIELDS[step].includes(name);

  const hasStepError = (name: keyof CertificationFormValues) =>
    showErrors && isFieldInCurrentStep(name) && !!errors[name];

  const goNext = async () => {
    setFormError(null);
    setShowErrors(true);

    const fields = STEP_FIELDS[step];
    const ok = await form.trigger(fields as any, { shouldFocus: true });

    if (!ok) {
      setFormError("Completa tutti i campi obbligatori evidenziati prima di continuare.");
      return;
    }

    setShowErrors(false);
    setStep((s) => (s < 2 ? ((s + 1) as any) : s));
  };

  const goBack = () => {
    setFormError(null);
    setShowErrors(false);
    setStep((s) => (s > 0 ? ((s - 1) as any) : s));
  };

  const onSubmit = async (values: CertificationFormValues) => {
    setFormError(null);
    setShowErrors(true);
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
        source_page:
          typeof window !== "undefined" ? window.location.pathname : undefined,
      }),
    });

    if (!res.ok) {
      setStatus("error");
      setFormError("Si è verificato un errore durante l’invio. Riprova tra poco.");

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

    setShowErrors(false);
    router.push("/thank-you");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* Progress step 1–2–3 */}
      <div className=" container flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          {[0, 1, 2].map((i) => {
            const done = i < step;
            const active = i === step;

            return (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                    done && "border-primary bg-primary text-primary-foreground",
                    active && "border-primary bg-background text-primary",
                    !done && !active && "border-input bg-background text-muted-foreground"
                  )}
                >
                  {i + 1}
                </div>

                {i < 2 && (
                  <div className={cn("h-px w-10 bg-border", done && "bg-primary")} />
                )}
              </div>
            );
          })}
        </div>

        <div className="text-xs text-muted-foreground">Step {step + 1} di 3</div>
      </div>

      {/* Alert unico */}
      {formError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}

      {/* Card wrapper */}
      <div className="rounded-2xl border bg-chart-4 p-5">
        {/* STEP 1 */}
        {step === 0 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="text-sm font-semibold">Tipo di certificazione</div>
              <div className="text-sm text-muted-foreground">
                Seleziona il percorso più adatto: puoi sempre cambiarlo.
              </div>
            </div>

            <div
              className={cn(
                "flex justify-center lg:justify-start",
                hasStepError("certification_type") && "rounded-full ring-1 ring-red-500"
              )}
            >
              <ToggleGroup
                type="single"
                value={form.watch("certification_type")}
                onValueChange={(v) => {
                  if (!v) return;
                  form.setValue("certification_type", v as any, { shouldValidate: true });
                }}
                className="inline-flex w-auto rounded-full border border-input bg-background p-1"
              >
                <ToggleGroupItem
                  value="madein"
                  className="rounded-full px-5 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  Made in Italy
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="hundred"
                  className="rounded-full px-5 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  100% Made in Italy
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Nome referente*"
                {...form.register("first_name")}
                className={cn(errClass(hasStepError("first_name")))}
              />
              <Input
                placeholder="Cognome referente*"
                {...form.register("last_name")}
                className={cn(errClass(hasStepError("last_name")))}
              />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="text-sm font-semibold">Dati aziendali</div>
              <div className="text-sm text-muted-foreground">
                Inserisci i dati essenziali per una prima valutazione.
              </div>
            </div>

            <Input
              placeholder="Ragione sociale azienda*"
              {...form.register("company_name")}
              className={cn(errClass(hasStepError("company_name")))}
            />

            <div className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Partita IVA*"
                {...form.register("vat_number")}
                className={cn(errClass(hasStepError("vat_number")))}
              />
              <Input
                placeholder="Email*"
                type="email"
                {...form.register("email")}
                className={cn(errClass(hasStepError("email")))}
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Telefono*"
                {...form.register("phone")}
                className={cn(errClass(hasStepError("phone")))}
              />
              <Input
                placeholder="Sito web*"
                {...form.register("website")}
                className={cn(errClass(hasStepError("website")))}
              />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="text-sm font-semibold">Produzione e sede</div>
              <div className="text-sm text-muted-foreground">
                Informazioni utili per qualificare correttamente la richiesta.
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Via / Indirizzo*"
                {...form.register("street")}
                className={cn(errClass(hasStepError("street")))}
              />
              <Input
                placeholder="CAP*"
                {...form.register("postal_code")}
                className={cn(errClass(hasStepError("postal_code")))}
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Città / Comune*"
                {...form.register("city")}
                className={cn(errClass(hasStepError("city")))}
              />
              <Input
                placeholder="Provincia*"
                {...form.register("province")}
                className={cn(errClass(hasStepError("province")))}
              />
            </div>

            <div className={cn(hasStepError("sector") && "rounded-md ring-1 ring-red-500", "grid gap-3 md:grid-cols-2")} >
              <Input
                placeholder="Nazione*"
                {...form.register("country")}
                className={cn(errClass(hasStepError("country")))}
              />
              <Select
                value={form.watch("sector")}
                onValueChange={(v) => form.setValue("sector", v, { shouldValidate: true })}
              >
                <SelectTrigger className={cn(hasStepError("sector") && "border-red-500")}>
                  <SelectValue placeholder="Settore di produzione*" />
                </SelectTrigger>
                <SelectContent>
                  {SECTORS.map((s: { value: string; label: string }) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Descrivi i tuoi prodotti e il ciclo di produzione*"
              rows={12}
              {...form.register("production_description")}
              className={cn(errClass(hasStepError("production_description")))}
            />

            <input
              type="text"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("website_hp")}
            />

            <label
              className={cn(
                "flex items-start gap-2 text-sm text-muted-foreground",
                hasStepError("consent_privacy") && "rounded-md ring-1 ring-red-500 p-2"
              )}
            >
              <Checkbox
                checked={form.watch("consent_privacy")}
                onCheckedChange={(v) =>
                  form.setValue("consent_privacy", v === true, {
                    shouldValidate: true,
                  })
                }
              />
              <span>
                Autorizzo il trattamento dei dati dichiarando di aver preso visione
                dell&apos;informativa sulla{" "}
                <Link href="/privacy-policy" className="text-primary underline">
                  privacy
                </Link>
                .
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className=" container flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={goBack}
          disabled={step === 0 || status === "loading"}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Indietro
        </Button>

        {step < 2 ? (
          <Button type="button" onClick={goNext} disabled={status === "loading"}>
            Avanti
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={status === "loading"}>
            <Send className="mr-2 h-4 w-4" />
            {status === "loading" ? "Invio in corso…" : "Invia richiesta"}
          </Button>
        )}
      </div>
    </form>
  );
}