import { Check, ChevronRight, Link } from "lucide-react";

import { cn } from "@/lib/utils";

import InfoRequestForm from "../forms/InfoRequestForm";
import { Button } from "../ui/button";

interface ContactProps {
  className?: string;
}

const Contact = ({ className }: ContactProps) => {
  const features = [
    {
      title: "Un confronto chiaro",
      description: "sui requisiti di certificazione",
    },
    {
      title: "Indicazioni",
      description: "sul percorso più adatto alla tua realtà aziendale",
    },
    {
      title: "Risposte puntuali ",
      description: "su processi, tempi e documentazione richiesta",
    },

  ];

  return (
    <section id="contatti" className={cn("relative container section-padding grid grid-cols-1 gap-x-32 overflow-hidden lg:grid-cols-2 items-center", className)}>
      <div className="w-full flex flex-col items-center justify-center space-y-6">
        <h2 className="mt-3 w-full text-4xl tracking-tighter lg:text-5xl">
          Richiedi {' '}
          <span className="text-primary">
            Informazioni
          </span>
        </h2>
        <p className="text-muted-foreground">
          Hai bisogno di chiarimenti sulle certificazioni Federitaly o vuoi capire quale percorso è più adatto alla tua azienda?
          Compila il form: il nostro team ti ricontatterà per fornirti tutte le informazioni necessarie.
        </p>
        <ul className="space-y-4 pb-4">
          <li className="mb-3">
            <p className="font-semibold tracking-tight opacity-50">
            Cosa puoi aspettarti:
            </p>
          </li>
          {features.map((feature) => (
            <li key={feature.title} className="flex gap-4 lg:items-start">
              <Check className="size-4 mt-1 text-primary" />
              <p className="font-medium tracking-tight">
                {feature.title}
                <span className="pl-2 opacity-30">{feature.description}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full justify-center lg:mt-2.5 bg-chart-4 rounded-4xl p-3 backdrop-blur-sm shadow-xl/7">
        <div className="w-full p-4 bg-background border border-primary/10 rounded-xl">
          <InfoRequestForm/>
        </div>
      </div>
    </section>
  );
};

export { Contact };
