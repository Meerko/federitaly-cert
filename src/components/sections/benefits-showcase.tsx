import Image from 'next/image';

import Noise from '@/components/noise';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const COLUMNS_DATA = [
  {
    image: '/images/benefits-showcase/federitaly-camera.webp',
    imageAlt: 'Federitaly Camera dei Deputati',
    cardTitle: 'Siamo un’organizzazione nazionale nata con un obiettivo chiaro: proteggere l’autenticità del Made in Italy e sostenere lo sviluppo delle imprese italiane',
    cardContent:
      'Lavoriamo per garantire che ogni impresa italiana possa operare in un contesto più trasparente, competitivo e sostenibile, senza essere schiacciata da burocrazia, concorrenza sleale o contraffazione.',
    cardPosition: 'bottom' as const,
  },
  {
    image: '/images/benefits-showcase/federitaly-ministero.webp',
    imageAlt: 'Open AI.',
    cardTitle: 'Un ruolo istituzionale riconosciuto',
    cardContent:
      'Siamo un interlocutore istituzionale accreditato, presente nei luoghi in cui si definiscono le politiche che riguardano il lavoro, l’economia e la tutela del Made in Italy.',
    cardPosition: 'inside' as const,
  },
  {
    image: '/images/benefits-showcase/federitaly-parlamento-europeo.webp',
    imageAlt: 'Federitaly Parlamento Europeo',
    cardTitle: 'Siamo presenti e attivi',
    cardContent:
      'ai tavoli ministeriali del Governo italiano, nelle sessioni del Parlamento Europeo, nel dialogo costante con istituzioni, enti regolatori, camere di commercio, università e organizzazioni internazionali.',
    cardPosition: 'top' as const,
  },
];

export default function BenefitsShowcase() {
  return (
    <section className="section-padding relative" id="federitaly">
      <Noise />
      <div className="bigger-container">
        <h2 className="mb-12 text-center text-4xl leading-none font-medium text-balance lg:mb-16 lg:text-5xl">
          <span className="text-primary">Federitaly:</span> {}
          
          difendiamo, rappresentiamo e valorizziamo l’identità produttiva italiana
        </h2>

        {/* Three Column Grid */}
        <div className="mx-auto grid max-w-sm gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {COLUMNS_DATA.map((column, index) => {
            if (column.cardPosition === 'inside') {
              return <InsideCardColumn key={index} {...column} />;
            }

            return <TopBottomCardColumn key={index} {...column} />;
          })}
        </div>
      </div>
    </section>
  );
}

// Column Components
interface ColumnProps {
  image: string;
  imageAlt: string;
  cardTitle?: string;
  cardContent: string;
  cardPosition: 'top' | 'inside' | 'bottom';
}

function TopBottomCardColumn({
  image,
  imageAlt,
  cardTitle,
  cardContent,
  cardPosition,
}: ColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      {cardPosition === 'bottom' && (
        <div className="relative aspect-[389/384] w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="rounded-xl border object-cover"
          />
        </div>
      )}
      <Card className="gap-4">
        <CardHeader className="gap-0">
          <CardTitle className="text-xl leading-tight font-semibold text-balance ">{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground/70 text-sm leading-relaxed md:text-base">{cardContent}</CardDescription>
        </CardContent>
      </Card>
      {cardPosition === 'top' && (
        <div className="relative aspect-[389/384] w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="rounded-xl border object-cover"
          />
        </div>
      )}
    </div>
  );
}

function InsideCardColumn({
  image,
  imageAlt,
  cardTitle,
  cardContent,
}: ColumnProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="relative aspect-[326/576] w-full flex-1 overflow-hidden rounded-xl border lg:aspect-auto">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
        {/* Overlay card */}
        <Card className="absolute right-6 bottom-6 left-6 gap-4">
          <CardHeader className="gap-0">
            <CardTitle className="text-xl leading-tight font-semibold text-balance">
              {cardTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-muted-foreground/70 text-sm leading-relaxed md:text-base">{cardContent}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
