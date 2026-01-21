'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BadgeCheck, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

import Noise from '@/components/noise';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const features = [
  {
    id: '100madeinitaly',
    title: '100% Made in Italy',
    description: 'Per le aziende che svolgono l’intero processo produttivo in Italia, nel rispetto della normativa vigente e dei disciplinari Federitaly.',
    image: {
      src: '/images/certificazioni/100-made-in-italy-federitaly.webp',
      alt: '100% Made in Italy - Quando l’italianità è totale',
      width: 400,
      height: 400,
      className: '',
    },
    features: [
      { name: 'Progettazione e sviluppo in Italia' },
      { name: 'Produzione e trasformazione in Italia' },
      { name: 'Controllo del processo produttivo sul territorio nazionale' },
      { name: 'Coerenza tra dichiarazioni, documentazione e realtà aziendale' },
    ],
    cta: {
      button: 'Scopri la Certificazione',
      href: '/100-made-in-italy',
    },
  },
  {
    id: 'madeinitaly',
    title: 'Made in Italy',
    description: 'Per le aziende che mantengono in Italia le fasi strategiche e qualificanti del processo produttivo.',
    image: {
      src: '/images/certificazioni/made-in-italy-federitaly.webp',
      alt: 'Made in Italy - Quando l’Italia è parte essenziale del processo',
      width: 400,
      height: 400,
      className: '',
    },
    features: [
      { name: 'Fasi produttive strategiche svolte in Italia' },
      { name: 'Know-how, controllo e responsabilità italiana' },
      { name: 'Coerenza tra comunicazione aziendale e realtà produttiva' },
      { name: 'Rispetto dei disciplinari Federitaly' },
    ],
    cta: {
      button: 'Scopri la Certificazione',
      href: '/made-in-italy',
    },
  },
];

export default function FeaturesCarousel() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation variants
  const headerVariants = {
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
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(2px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 20,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 60,
      scale: 0.95,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
    api?.scrollTo(index);
  };

  // Listen to carousel changes to update active index
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect(); // Set initial state

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section
      id="servizi"
      className="section-padding relative overflow-x-hidden"
    >
      <Noise />
      <div className="container lg:grid gap-8 lg:grid-cols-3 lg:gap-8">
        {/* Left Content */}
        <div className="flex flex-col gap-8 lg:col-span-1">
          {/* Title and Description */}
          <motion.div
            className="space-y-4"
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
          >
            <h2 className="text-4xl tracking-tight text-balance lg:text-5xl">
              Le nostre{' '}
              <span className="text-primary">
                Certificazioni
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-snug pb-4">
            Federitaly rilascia certificazioni ufficiali per la tutela del Made in Italy, basate su criteri verificabili e controlli indipendenti.
            </p>
          </motion.div>

          {/* Icon Buttons */}
          <motion.div
            className="hidden max-w-[155px] grid-cols-2 gap-5 lg:grid"
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {features.map((feature, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={feature.id}
                  onClick={() => handleFeatureClick(index)}
                  variants={buttonVariants}
                  className={cn(
                    `border-input hover:bg-border/50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full transition-all duration-300`,
                    isActive && 'shadow-md',
                  )}
                >
                  <Image
                    key={feature.id}
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    className={cn(
                      'object-contain transition-transform duration-300 hover:scale-105', !isActive && 'opacity-50',
                      feature.image.className,
                    )}
                  />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Dots Indicator */}
          <div className="mt-6 hidden flex-1 items-end justify-center gap-1 lg:flex">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => handleFeatureClick(index)}
                className={cn(
                  'size-1.5 cursor-pointer rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'bg-primary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Content - Carousel Cards */}
        <motion.div
          className="select-none md:mask-r-from-50% md:mask-r-to-100% lg:col-span-2"
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: 'start',
              containScroll: 'trimSnaps',
              skipSnaps: false,
            }}
            className="cursor-grab w-full"
          >
            <CarouselContent className="h-fit gap-2">
              {features.map((feature) => (
                <CarouselItem
                  key={feature.id}
                  className="md:basis-[60%] mb-6"
                >
                  <Card className="bg-chart-4 border-secondary/10 transition-all duration-300 h-full justify-between hover:shadow-lg p-6">
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg leading-tight md:text-2xl lg:text-3xl">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-sm md:text-md text-balance">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 border border-secondary/10 bg-background rounded-lg py-6">
                      {feature.features.map((feature) => (
                      <div 
                      key={feature.name}
                      className="flex items-center gap-3">
                        <div className="">
                          <BadgeCheck className="text-primary size-4" />
                        </div>
                        <span
                          key={feature.name}
                          className={cn('text-sm', 'text-muted-foreground/70',)}
                        >
                          {feature.name}
                        </span>
                      </div>  
                      ))}
                      <Button
                        size="lg"
                        key={feature.cta.href}
                        asChild
                        className="mt-2 rounded-xl !pl-5.5 before:rounded-full w-fit"
                      >
                        <Link href={feature.cta.href}>
                          {feature.cta.button}
                          <div className="bg-background/15 border-background/10 grid size-5.5 place-items-center rounded-xl border">
                            <ChevronRight className="size-4" />
                          </div>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
              <Card className="!bg-transparent border-none transition-all duration-300 h-full justify-between p-16">
                <CardHeader className="p-8"/>
              </Card>
            </CarouselContent>
          </Carousel>
          {/* Icon Buttons */}
          <motion.div
            className="mx-auto my-8 flex max-w-md justify-center gap-4 lg:hidden"
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {features.map((feature, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={feature.id}
                  onClick={() => handleFeatureClick(index)}
                  variants={buttonVariants}
                  className={cn(
                    `border-input hover:bg-border/50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full transition-all duration-300`,
                    isActive && 'bg-border',
                  )}
                >
                  <Image
                    key={feature.id}
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    className={cn(
                      'object-contain transition-transform duration-300 hover:scale-105',
                      feature.image.className,
                    )}
                  />
                </motion.button>
              );
            })}
          </motion.div>

          {/* Dots Indicator */}
          <motion.div
            className="flex flex-1 items-end justify-center gap-1 lg:hidden"
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {features.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleFeatureClick(index)}
                variants={buttonVariants}
                className={cn(
                  'size-1.5 cursor-pointer rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'bg-foreground'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
