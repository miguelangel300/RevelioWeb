import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import JsonLd from '@/components/seo/JsonLd';
import Reveal from '@/components/motion/Reveal';
import { faqs } from '@/data/faq';
import { getFaqSchema } from '@/lib/schema';

export default function FaqSection() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <JsonLd data={getFaqSchema(faqs)} />
      <Reveal className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-serif font-semibold text-primary mb-4 text-center">
          Preguntas frecuentes
        </h2>
        <p className="text-lg text-foreground/80 text-center mb-12">
          Lo que más nos preguntáis antes de reservar fecha.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left font-serif text-xl text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
