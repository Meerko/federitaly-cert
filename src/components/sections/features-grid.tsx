'use client';

import Image from 'next/image';

import Noise from '@/components/noise';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const FEATURES_DATA = [
  {
    id: 1,
    image: '/images/features-grid/ministero-madein.webp',
    imageAlt: 'Fondamento normativo',
    title: 'Fondamento normativo',
    description:
      'Il sistema opera nel rispetto della normativa italiana ed europea in materia di origine dei prodotti, assicurando allineamento ai riferimenti legislativi vigenti.',
    className: 'lg:col-span-3',
  },
  {
    id: 2,
    image: '/images/features-grid/disciplinari.webp',
    imageAlt: 'Disciplinari pubblici',
    title: 'Disciplinari pubblici',
    description:
      'I criteri di certificazione sono definiti all’interno di disciplinari chiari e pubblicamente accessibili, a garanzia di trasparenza e uniformità di valutazione.',
    className: 'lg:col-span-3',
  },
  {
    id: 3,
    image: '/images/features-grid/controlli-indipendenti.webp',
    imageAlt: 'Controlli indipendenti',
    title: 'Controlli indipendenti',
    description:
      'Il percorso prevede audit e controlli svolti da soggetti terzi e indipendenti, incaricati di verificare l’effettiva conformità ai requisiti previsti.',
    className: 'lg:col-span-4',
  },
  {
    id: 4,
    image: '/images/features-grid/no-autocertificazione.webp',
    imageAlt: 'Assenza di autocertificazione',
    title: 'Assenza di autocertificazione',
    description:
      'La certificazione non si basa su dichiarazioni autonome dell’azienda, ma su verifiche esterne e strutturate.',
    className: 'lg:col-span-2',
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features-grid" className="section-padding relative">
      <Noise />

      <div className="container">
        {/* Section Header */}
        <div className="mx-auto max-w-5xl space-y-3 lg:space-y-4 lg:text-center">
          <h2 className="text-4xl tracking-tight lg:text-5xl">
            <span className="text-primary">Rigore normativo</span> <br />
            e credibilità istituzionale
          </h2>
          <p className="text-muted-foreground text-lg leading-snug lg:text-balance">
            Operiamo come soggetto terzo, a tutela dell’interesse generale del Made in Italy e delle imprese
            che lo rappresentano con serietà.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-8 grid grid-cols-1 gap-2 lg:mt-12 lg:grid-cols-6">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ image, imageAlt, title, description, className }: FeatureCardProps) {
  return (
    <Card className={cn('h-full border border-secondary/10', className)}>
      <CardContent>
        <div className="relative h-60 w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
            priority={false}
          />
        </div>
      </CardContent>

      <CardHeader className="">
        <CardTitle className="text-xl font-semibold leading-tight">{title}</CardTitle>
        <p className="text-muted-foreground/70 leading-relaxed">{description}</p>
      </CardHeader>
    </Card>
  );
}