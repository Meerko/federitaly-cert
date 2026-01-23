import { ChevronRight, Check } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/aceternity/3d-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TechnologyProps {
  className?: string;
}

const Technology = ({ className }: TechnologyProps) => {
  const features = [
    {
      title: "Integrità delle informazioni",
      description: "I dati associati al certificato non possono essere alterati, garantendo coerenza e affidabilità nel tempo.",
    },
    {
      title: "Verifica semplice e immediata",
      description: "Il certificato è consultabile tramite strumenti di accesso diretto, senza passaggi intermedi o interpretazioni.",
    },
    {
      title: "Tracciabilità e continuità",
      description:
        "Le informazioni restano disponibili anche nel lungo periodo, a tutela dell’azienda e dei suoi interlocutori.",
    },
  ];

  return (
    <section className={cn("h-full w-screen overflow-hidden section-padding", className)}>
      <div className="relative container flex h-full flex-col items-start justify-between gap-10 lg:flex-row">
        <div className="w-full space-y-6 lg:w-3/5">
          <h2 className="mt-3 w-full max-w-2xl text-4xl tracking-tighter lg:text-5xl">
            La {' '}
            <span className="text-primary">
              Blockchain
            </span> {' '}
            al servizio delle certificazioni Made in Italy
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Abbiamo scelto di integrare le proprie certificazioni con tecnologie avanzate di tracciabilità digitale.
            <br />
            <br />
            Ogni certificazione è verificabile attraverso un QR Code che rimanda a informazioni certe, 
            non modificabili e pubblicamente consultabili.
          </p>
          <ul className="space-y-4">
            <li className="mb-3">
              <p className="font-semibold tracking-tight opacity-50">
                Questo approccio garantisce:
              </p>
            </li>
            {features.map((feature) => (
              <li key={feature.title} className="flex gap-4 lg:items-start">
                <Check className="size-5 mt-1 text-primary" />
                <p className="font-medium tracking-tight">
                  {feature.title}
                  <span className="pl-2 opacity-30">{feature.description}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex gap-2">
            <Button className="!text-sm shadow-none" size="lg" asChild>
              <Link href="#contatti">Richiedi informazioi
                <div className="bg-background/15 border-background/10 grid size-5.5 place-items-center rounded-xl border">
                  <ChevronRight className="size-4" />
                </div>
              </Link>
            </Button>
          </div>
        </div>
        <CardContainer
          className="w-full"
          containerClassName="h-full w-full p-0 m-0 lg:w-2/5"
        >
          <CardBody className="group/card flex h-full !w-full flex-col items-center justify-center rounded-3xl border border-primary bg-chart-4 px-5 py-8 space-y-4">
            <CardItem translateZ="60" className="w-fill flex items-center justify-center">
              <img
                src="https://cantinediorgosolo.it/cdn/shop/files/Senza_titolo-1.png?v=1737068370&width=100"
                height="40"
                width="40"
                className="h-fill w-fill object-cover lg:h-full"
                alt="logo-cantine-orgosolo"
              />
            </CardItem>
            <CardItem
              translateZ="60"
              className="mb-2 max-w-xs text-center text-3xl leading-none font-semibold tracking-tight"
            >
              CANTINE DI ORGOSOLO S.r.l.
            </CardItem>
            <CardItem
              as="p"
              translateZ="25"
              className="my-4 flex w-full max-w-sm items-center justify-center text-sm tracking-tight"
            >
              <span className="mr-2 opacity-50">Certificato</span>
              <span className="text-primary font-semibold">100% Made in Italy</span>
            </CardItem>
            
            <CardItem translateZ="60" className="my-4 w-full flex items-center justify-center">
              <img
                src="/images/certificazioni/100-made-in-italy-federitaly.webp"
                height="400"
                width="400"
                className="h-60 w-60 rounded-full object-cover group-hover/card:shadow-xl lg:h-full"
                alt="thumbnail"
              />
            </CardItem>

            <div className="flex w-full flex-col items-center justify-center">
              <span className="mt-4 mb-2 text-sm tracking-tight opacity-50">Con il supporto di</span>
              <img
                className="w-30"
                src="https://www.origyn.com/origyn-logo-black.png"
                alt="origyn-logo"
              />
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </section>
  );
};

export { Technology };
