
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const title = 'Política de Cookies | Revelio Photography';
const description =
  'Política de cookies de Revelio Photography: qué cookies usamos en la web y cómo configurarlas.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/politica-de-cookies',
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.siteUrl}/politica-de-cookies`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [siteConfig.ogImage],
  },
};

export default function CookiePolicyPage() {
  const siteName = "Revelio Photography";
  const companyName = "Revelio Photography";
  const contactEmail = "info@reveliophotography.es";

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      <Breadcrumbs name="Política de cookies" path="/politica-de-cookies" />
      <div className="space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-serif font-semibold text-primary mb-6">Política de Cookies</h1>
        </section>

        <section className="space-y-4 text-foreground/80 text-base leading-relaxed">
          <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">1. ¿Qué son las cookies?</h2>
          <p>
            Una cookie es un pequeño fichero de texto que un sitio web almacena en el ordenador o dispositivo móvil del usuario cuando visita el sitio. Las cookies permiten que el sitio web recuerde las acciones y preferencias del usuario (como inicio de sesión, idioma, tamaño de fuente y otras preferencias de visualización) durante un período de tiempo, para que no tenga que volver a configurarlas cada vez que regrese al sitio o navegue de una página a otra.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">2. ¿Qué tipos de cookies utilizamos?</h2>
          <p>En {siteName}, utilizamos los siguientes tipos de cookies:</p>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>
              <strong>Cookies técnicas o funcionales:</strong> Son aquellas que son esenciales para el funcionamiento del sitio web. Sin ellas, el sitio no podría funcionar correctamente. Utilizamos cookies funcionales (a través de `localStorage` del navegador, que funciona de manera similar) para:
              <ul className="list-disc list-inside space-y-1 pl-6 mt-2">
                  <li>Recordar tu consentimiento sobre el uso de cookies (`cookie_consent`), para no mostrarte el banner de consentimiento repetidamente una vez aceptado.</li>

                  <li>Recordar tu preferencia de tema (claro/oscuro/sistema) para adaptar la apariencia del sitio.</li>
              </ul>
            </li>
            <li>
              <strong>Cookies analíticas o de rendimiento:</strong> Estas cookies nos ayudan a entender cómo interactúan los visitantes con nuestro sitio web, recopilando y proporcionando información de forma anónima. Nos permiten contar las visitas y fuentes de tráfico para poder medir y mejorar el rendimiento de nuestro sitio. Utilizamos Google Analytics y las herramientas analíticas de Vercel para este propósito. Estas herramientas pueden almacenar cookies en tu dispositivo para realizar el seguimiento de tu actividad de forma anónima.
            </li>
            <li>
              <strong>Cookies de publicidad comportamental:</strong> Estas cookies almacenan información del comportamiento de los usuarios obtenida a través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un perfil específico para mostrar publicidad en función del mismo.<br />
              <em>(Actualmente, no utilizamos cookies de este tipo).</em>
            </li>

          </ul>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">3. ¿Cómo controlar y eliminar las cookies?</h2>
          <p>
            Puedes controlar, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador. A continuación, te proporcionamos enlaces a las instrucciones de los navegadores más populares:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Microsoft Edge</a></li>
          </ul>
          <p>
            Si bloqueas las cookies, es posible que algunos servicios o funcionalidades de la web no funcionen correctamente.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">4. Cambios en la Política de Cookies</h2>
          <p>
            {companyName} puede modificar esta Política de Cookies en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos. Por ello se aconseja a los usuarios que la visiten periódicamente.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">5. Contacto</h2>
          <p>
            Si tienes alguna pregunta sobre esta Política de Cookies, puedes contactarnos a través de nuestro <Link href="/contacto" className="underline hover:text-primary">formulario de contacto</Link> o escribiéndonos a {contactEmail}.
          </p>
        </section>
      </div>
    </div>
  );
}
