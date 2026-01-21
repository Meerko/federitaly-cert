'use client';

import { ChevronRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

import Noise from '@/components/noise';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

const faqData = [
  {
    id: 'federitaly-who-is-it-for',
    question: 'Chi può richiedere la certificazione Federitaly?',
    answer:
      'Possono richiedere la certificazione le aziende che operano nel rispetto dei requisiti previsti e che intendono valorizzare in modo corretto e verificabile l’origine italiana dei propri prodotti e processi produttivi.',
  },
  {
    id: 'federitaly-made-in-italy-difference',
    question: 'Qual è la differenza tra “100% Made in Italy” e “Made in Italy”?',
    answer:
      'Le due certificazioni rispondono a criteri differenti. La certificazione 100% Made in Italy è riservata alle aziende che svolgono l’intero processo produttivo in Italia, mentre la certificazione Made in Italy riguarda le imprese che mantengono in Italia le fasi strategiche e qualificanti della produzione.',
  },
  {
    id: 'federitaly-certification-based-on-self-certification',
    question: 'La certificazione si basa su autocertificazione dell’azienda?',
    answer:
      "No. La certificazione non si basa su autocertificazioni, ma su verifiche strutturate che includono analisi documentali, audit e valutazioni indipendenti secondo criteri definiti.",
  },
  {
    id: 'federitaly-certification-duration',
    question: 'Quanto dura il processo di certificazione?',
    answer:
      'La durata del processo varia in base alla complessità dell’azienda e alla completezza della documentazione fornita. In ogni caso, il percorso è strutturato per garantire chiarezza e tempi coerenti con le fasi di verifica previste.',
  },
  {
    id: 'federitaly-certification-validity',
    question: 'La certificazione ha validità nel tempo?',
    answer:
      'Sì. La certificazione ha una validità definita e prevede verifiche periodiche, al fine di garantire che i requisiti continuino a essere rispettati nel tempo.',
  },
  {
    id: 'federitaly-certification-usage',
    question: 'Come può essere utilizzata la certificazione dall’azienda?',
    answer:
      'La certificazione può essere utilizzata come strumento di tutela e valorizzazione, integrandola nella comunicazione aziendale, nei materiali istituzionali e nelle relazioni con clienti, partner e mercati.',
  },
];

export default function FAQSection() {
  return (
    <section className="section-padding relative" id="faq">
      <Noise />
      <div className="container">
        {/* Section Header */}
        <h2 className="text-4xl leading-tight tracking-tight lg:text-5xl">
          FAQ
        </h2>

        {/* FAQ Content */}
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-3">
          {/* FAQ Accordion - Left Side */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-secondary/10 hover:shadow-primary/5 rounded-lg !border px-6 py-2 transition-all duration-300 hover:shadow-md"
                >
                  <AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline md:text-lg lg:text-xl">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Card className="hover:shadow-primary/5 border-secondary/10 h-full gap-6 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="gap-6 md:gap-8 lg:gap-11">
              <MessageSquare className="text-primary size-18 stroke-1 md:size-20" />

              <h3 className="text-2xl">Hai altre domande?</h3>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground">
                Il nostro team è a tua disposizione per aiutarti a valorizzare al meglio il percorso di certificazione, dall’avvio all’integrazione, fino al supporto continuo.
              </p>
            </CardContent>
            <CardFooter className="mt-auto justify-self-end">
              <Button
                size="lg"
                variant="default"
                className="group h-12 w-full gap-4"
                asChild
              >
                <Link href="/#contatti">Contattaci
                <div className="bg-background/15 border-background/10 grid size-5.5 place-items-center rounded-xl border">
                  <ChevronRight className="size-4" />
                </div>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
