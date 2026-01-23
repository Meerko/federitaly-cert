'use client';

import { ScanSearch, FileText, Stamp, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

import Noise from '@/components/noise';
import { Card, CardContent } from '@/components/ui/card';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

const features = [
  {
    id: 'analisi',
    icon: ScanSearch,
    title: 'Analisi preliminare di ammissibilità',
    description:
      'Una prima valutazione consente di verificare l’idoneità dell’azienda e dei prodotti rispetto ai requisiti della certificazione, fornendo indicazioni chiare prima di avviare il percorso.',
    image: {
      src: '/images/features-showcase/certificazione-audit-crpd.jpg',
      alt: 'Analisi preliminare di ammissibilità',
    },
  },
  {
    id: 'audit',
    icon: FileText,
    title: 'Audit documentale e ispettivo in azienda',
    description:
      'Viene condotta un’analisi approfondita della documentazione e delle attività aziendali, affiancata da una verifica ispettiva volta a confermare la coerenza tra quanto dichiarato e la realtà produttiva.',
    image: {
      src: '/images/features-showcase/audit-vino.webp',
      alt: 'Audit documentale e ispettivo in azienda',
    },
  },
  {
    id: 'validazione',
    icon: Stamp,
    title: 'Validazione da parte dell’ente di certificazione indipendente',
    description:
      'Le evidenze raccolte sono sottoposte a valutazione da parte di un ente di certificazione indipendente, che ne verifica la conformità ai criteri previsti e ne attesta l’esito.',
    image: {
      src: '/images/features-showcase/approvazione.webp',
      alt: 'Validazione da parte dell’ente di certificazione indipendente',
    },
  },
  {
    id: 'notarizzazione',
    icon: BadgeCheck,
    title: 'Notarizzazione tramite tecnologia blockchain',
    description:
      'Il certificato viene registrato in modo sicuro e non modificabile, garantendo integrità delle informazioni, tracciabilità e possibilità di verifica nel tempo.',
    image: {
      src: '/images/features-showcase/dfinity-federitaly.webp',
      alt: 'Notarizzazione tramite tecnologia blockchain',
    },
  },
];

export default function FeaturesShowcase() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const featureItem = {
    hidden: { opacity: 0, y: 30, filter: 'blur(2px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 25,
        mass: 1,
        duration: 0.6,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 120, damping: 20, delay: 0.1 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: 'blur(1px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 80, damping: 20, delay: 0.2 },
    },
  };

  return (
    <section id="processo" className="section-padding relative overflow-hidden">
      <Noise />

      <div className="container">
        {/* Section Header */}
        <motion.div
          className="max-w-4xl space-y-6 md:space-y-8"
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30, filter: 'blur(2px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                type: 'spring' as const,
                stiffness: 100,
                damping: 25,
                duration: 0.6,
              },
            },
          }}
        >
          <h2 className="text-4xl tracking-tight lg:text-5xl">
            Un <span className="text-primary">sistema di verifica</span>,<br />
            non un’autodichiarazione
          </h2>
          <p className="text-muted-foreground text-lg leading-snug">
            A differenza di iniziative basate su autocertificazione, verifichiamo le informazioni fornite
            dalle aziende attraverso un processo di certificazione strutturato e indipendente pensato per
            garantire coerenza, trasparenza e valore nel tempo per le aziende certificate.
          </p>
        </motion.div>

        {/* Features */}
        <div className="mt-8 space-y-8 md:mt-14 md:space-y-14 lg:mt-24 lg:space-y-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isReverse = index >= 2;

            return (
              <motion.div
                key={feature.id}
                className={cn('grid items-center gap-4 lg:grid-cols-2 lg:gap-16', !isReverse && 'lg:grid-flow-col-dense')}
                variants={featureItem}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Content */}
                <motion.div
                  className={cn('space-y-4 md:space-y-6 lg:space-y-8', !isReverse && 'lg:col-start-2')}
                  variants={contentVariants}
                >
                  <div className="flex items-center gap-4">
                    <Card className="flex size-12 shrink-0 border border-secondary/10 items-center justify-center rounded-lg !p-0 md:size-16">
                      <IconComponent className="size-6 text-primary" strokeWidth={2.1} />
                    </Card>
                    <h3 className="text-2xl tracking-tight md:hidden lg:text-3xl">{feature.title}</h3>
                  </div>

                  <div className="space-y-2">
                    <h3 className="hidden text-2xl tracking-tight md:block lg:text-3xl">{feature.title}</h3>
                    <p className="text-muted-foreground/70 text-sm leading-relaxed md:text-base">{feature.description}</p>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div className={cn('relative', !isReverse && 'lg:col-start-1')} variants={imageVariants}>
                  {(index === 0 || index === 2) && (
                    <>
                      <div
                        className={cn(
                          'bg-chart-2 absolute size-40 rounded-full opacity-30 blur-3xl will-change-transform md:opacity-80',
                          index === 0 && 'top-0 left-0 -translate-x-1/5',
                          index === 2 && 'top-0 right-0 translate-y-1/2',
                        )}
                      />
                      <div
                        className={cn(
                          'bg-chart-3 absolute size-40 rounded-full opacity-50 blur-3xl will-change-transform md:opacity-100',
                          index === 0 && 'top-0 left-0 translate-y-1/2',
                          index === 2 && 'top-0 right-0 translate-x-1/5',
                        )}
                      />
                    </>
                  )}

                  <Card className="bg-chart-4 py-4 relative overflow-hidden border-none shadow-lg/5">
                    <CardContent className="px-4">
                      <div className="relative h-[220px] w-full overflow-hidden rounded-lg bg-muted md:h-[260px]">
                        <Image
                          src={feature.image.src}
                          alt={feature.image.alt}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}