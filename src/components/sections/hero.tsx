'use client';

import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

import Noise from '@/components/noise';
import Logos from '@/components/sections/logos';
import { Button } from '@/components/ui/button';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const ACTION_BUTTONS = [
    { label: 'Certificati', href: '/100-made-in-italy', variant: 'default' as const },
    { label: 'Scopri come funziona', href: '/#processo', variant: 'ghost' as const },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(2px)',
    },
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

  const overlayVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 20,
        delay: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="section-padding relative flex flex-col items-center bg-[url(/images/bg-ita-hero.png)] bg-cover bg-center bg-no-repeat overflow-hidden">
      <motion.div
        variants={overlayVariants}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
        className="from-background/30 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent"
      />
      <Noise />
      <motion.div
        className="z-1 container text-center"
        variants={containerVariants}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl leading-tight tracking-tight md:text-5xl lg:text-6xl lg:text-balance"
        >
          Tuteliamo l’autenticità del vero Made in Italy
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground my-2 text-sm md:my-4 md:text-lg lg:my-6 lg:text-xl lg:text-balance"
        >
          Attraverso il nostro sistema di certificazioni indipendenti tuteliamo l’identità produttiva italiana e offriamo ai mercati internazionali uno strumento chiaro, verificabile e credibile per riconoscere il vero Made in Italy.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center">
        {ACTION_BUTTONS.map((button) => (
              <Button
                size="lg"
                key={button.label}
                variant={
                  button.variant === 'ghost' ? 'outline' : button.variant
                }
                asChild
                className="mt-2 rounded-xl !pl-5.5 before:rounded-full"
              >
                <Link href={button.href} target="_blank">
                  {button.label}
                  <div className="bg-background/15 border-background/10 grid size-5.5 place-items-center rounded-xl border">
                    <ChevronRight className="size-4" />
                  </div>
                </Link>
              </Button>
            ))}
        </motion.div>
        <div className="from-background pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent via-25% to-transparent" />
      </motion.div>
    </section>
  );
}
