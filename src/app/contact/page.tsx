import BookingForm from '@/components/contact/BookingForm';
import { MapPin, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';

const contactInfo = {
  displayPhone: "698480039 // 652408441 // 601370069",
  fullPhone: "+34698480039",
  email: "info@reveliophotography.es",
  whatsappNumber: "34698480039",
  whatsappMessage: "Hola, estoy interesado/a en tus servicios de fotografía de bodas y me gustaría saber más.",
};

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground transition-colors duration-300 antialiased font-sans">

      {/* Hero Header */}
      <header className="relative h-[60vh] min-h-[500px] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Pareja de novios sonriendo"
            src="/_DMA6855.jpg"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-script text-5xl md:text-7xl text-white mb-4 drop-shadow-md">
            Hablemos de Vuestra Historia
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed font-serif">
            Cada gran aventura comienza con un simple "Nuestra boda es ..." <br />Estamos deseando conocer los detalles de vuestro gran día.
          </p>
        </div>
      </header>

      {/* Main Content Form & Details */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-20">
        <div className="bg-card shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row border border-border">

          {/* Form Side */}
          <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-16 order-2 md:order-1 bg-background">
            <div className="mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">Envíanos un mensaje</h2>
              <p className="text-muted-foreground font-light font-sans text-lg">
                Rellena el formulario y nos pondremos en contacto con vosotros lo antes posible.
              </p>
            </div>
            <BookingForm />
          </div>

          {/* Contact Info Side */}
          <div className="w-full md:w-2/5 bg-muted/30 p-8 md:p-12 lg:p-16 flex flex-col justify-between order-1 md:order-2 border-b md:border-b-0 md:border-l border-border">
            <div>
              <h3 className="font-serif text-3xl  mb-8 text-primary">Información de Contacto</h3>
              <ul className="space-y-8">
                <li className="flex items-start">
                  <MapPin className="text-primary mr-4 mt-1 w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-1">Estudio</p>
                    <p className="text-foreground font-sans text-lg">Sevilla<br />Andalucía, España</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="text-primary mr-4 mt-1 w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-1">Email</p>
                    <a className="text-foreground font-sans text-lg hover:text-primary transition-colors" href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="text-primary mr-4 mt-1 w-6 h-6 shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-1">Teléfono / WhatsApp</p>
                    <a className="text-foreground font-sans text-lg hover:text-primary transition-colors block break-words" href={`tel:${contactInfo.fullPhone}`}>
                      {contactInfo.displayPhone}
                    </a>
                  </div>
                </li>
              </ul>
            </div>


          </div>
        </div>

        {/* FAQs */}
        <div className="mt-32 text-center max-w-4xl mx-auto">
          <span className="text-primary uppercase tracking-widest text-xs font-bold mb-2 block">Preguntas Frecuentes</span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12">Lo que soléis preguntar</h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-card p-8 rounded-sm shadow-sm border border-border">
              <h4 className="font-serif text-xl font-bold mb-3 text-primary">¿Viajáis para bodas?</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                ¡Absolutamente! Nos encanta viajar. Tanto si os casáis en una playa lejana como en una montaña nevada, estaremos allí.
              </p>
            </div>
            <div className="bg-card p-8 rounded-sm shadow-sm border border-border">
              <h4 className="font-serif text-xl font-bold mb-3 text-primary">¿Cuánto tardáis en entregar las fotos?</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                Solemos enviar un pequeño avance en la primera semana. La galería completa está lista entre 4 y 6 semanas después de la boda.
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
