'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Noise from '@/components/noise';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


const performanceStats = [
  {
    value: 'Tutela il valore del Made in Italy nel mondo',
    description:
      'Proteggi l’azienda da fenomeni di Italian Sounding e comunicazioni ambigue.',
  },
  {
    value: 'Rafforza la reputazione della tua azienda',
    description:
      'Supporta la fiducia di clienti, buyer e partner commerciali.',
  },
  {
    value: 'Supporta comunicazione e posizionamento',
    description:
      'Integra un riferimento verificabile nei materiali commerciali e istituzionali.',
  },
];

export default function competitiveAdvantage() {
  return (
    <section className="section-padding relative" id="vantaggi">
      <Noise />
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content Section */}
          <div className="flex-1 space-y-6 lg:space-y-8">
            <div className="space-y-8 lg:space-y-12">
              <h2 className="text-4xl leading-none font-medium tracking-tight text-balance lg:text-5xl">
              Il {' '}
              <span className="text-primary">
              vantaggio competitivo
              </span>{' '}
              per le aziende del Made in Italy
              </h2>
              <div className="">
                <p className="text-muted-foreground text-lg leading-snug lg:text-balance">
                In un mercato sempre più attento all’origine e alla trasparenza, 
                distinguersi in modo credibile è diventato un fattore strategico. 
                La certificazione rappresenta uno strumento concreto per valorizzare il proprio modello produttivo.
                </p>
                <br />
                <p className="text-muted-foreground text-lg leading-snug lg:text-balance">
                Richiedere una certificazione Federitaly consente alle imprese di 
                comunicare in modo chiaro e verificabile la propria identità produttiva, 
                tutelando il valore del Made in Italy e rafforzando la fiducia di 
                clienti, partner e mercati di riferimento.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button className="!text-sm shadow-none" size="lg" asChild>
                <Link href="/100-made-in-italy" target="_blank">Certificati
                <div className="bg-background/15 border-background/10 grid size-5.5 place-items-center rounded-xl border">
                  <ChevronRight className="size-4" />
                </div>
                </Link>
              </Button>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid gap-4">
            {/* First row - 2 images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 overflow-hidden rounded-lg">
                <Image
                  src="/images/competitive-advantage/federitaly-production.webp"
                  alt="Federitaly Production"
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative h-48 overflow-hidden rounded-lg">
                <Image
                  src="/images/competitive-advantage/federitaly-polaretti.webp"
                  alt="Federitaly Polaretti"
                  width={300}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="relative h-72 overflow-hidden rounded-lg">
              {/* Second row - 1 full width image */}
              <Image
                src="/images/competitive-advantage/federitaly-orominerva.webp"
                alt="Modern office workspace"
                width={600}
                height={256}
                className="h-full w-full rounded-lg object-cover object-right"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-4 pt-8 lg:!pt-16 !pb-0 md:grid-cols-3">
          {performanceStats.map((stat, index) => (
            <Card key={index} className="bg-chart-4 gap-4 border-primary">
              <CardHeader>
                <CardTitle className="text-xl leading-tight font-semibold text-balance">
                  {stat.value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground/70 text-sm leading-relaxed md:text-base">
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
