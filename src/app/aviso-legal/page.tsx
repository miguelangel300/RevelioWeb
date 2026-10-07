
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const title = 'Aviso Legal | Revelio Photography';
const description =
  'Aviso legal de Revelio Photography, estudio de fotografía y vídeo de bodas en Sevilla.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/aviso-legal',
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.siteUrl}/aviso-legal`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [siteConfig.ogImage],
  },
};

export default function LegalNoticePage() {
  const siteName = "Revelio Photography";
  const companyName = "Revelio Photography";
  const nif = "29532679N";
  const address = "Antonio Guzmán, 1, 41007, Sevilla, España";
  const email = "info@reveliophotography.es";
  const domainName = "reveliophotography.es"

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      <Breadcrumbs name="Aviso legal" path="/aviso-legal" />
      <div className="space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-serif font-semibold text-primary mb-6">Aviso Legal</h1>
        </section>

        <section className="space-y-4 text-foreground/80 text-base leading-relaxed">
          <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">1. Datos Identificativos del Titular</h2>
          <p>
            En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), a continuación se reflejan los siguientes datos:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Titular:</strong> {companyName}</li>
            <li><strong>NIF/CIF:</strong> {nif}</li>
            <li><strong>Domicilio Social:</strong> {address}</li>
            <li><strong>Correo Electrónico:</strong> <a href={`mailto:${email}`} className="underline hover:text-primary">{email}</a></li>
            <li><strong>Sitio Web:</strong> {siteName} ({domainName})</li>
          </ul>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">2. Objeto</h2>
          <p>
            El prestador, responsable del sitio web, pone a disposición de los usuarios el presente documento con el que pretende dar cumplimiento a las obligaciones dispuestas en la Ley 34/2002, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), así como informar a todos los usuarios del sitio web respecto a cuáles son las condiciones de uso del sitio web.
          </p>
          <p>
            Toda persona que acceda a este sitio web asume el papel de usuario, comprometiéndose a la observancia y cumplimiento riguroso de las disposiciones aquí dispuestas, así como a cualquier otra disposición legal que fuera de aplicación.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">3. Condiciones de Uso</h2>
          <p>
            El simple acceso a este sitio web no supone entablar ningún tipo de relación de carácter comercial entre {companyName} y el usuario. El acceso y la navegación en el sitio web {domainName} implica aceptar y conocer las advertencias legales, condiciones y términos de uso contenidas en ella.
          </p>
          <p>
            El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que {companyName} ofrece a través de su portal y con carácter enunciativo pero no limitativo, a no emplearlos para (i) incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público; (ii) difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">4. Propiedad Intelectual e Industrial</h2>
          <p>
            {companyName}, por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de {companyName} o bien de sus licenciantes.
          </p>
          <p>
            Todos los derechos reservados. En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de {companyName}.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">5. Exclusión de Garantías y Responsabilidad</h2>
          <p>
            {companyName} no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">6. Modificaciones</h2>
          <p>
            {companyName} se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
          </p>
          
          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">7. Enlaces</h2>
          <p>
             En el caso de que en {domainName} se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, {companyName} no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso {companyName} asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">8. Legislación Aplicable y Jurisdicción</h2>
          <p>
            La relación entre {companyName} y el usuario se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de {address.split(',')[2].trim()}.
          </p>

        </section>
      </div>
    </div>
  );
}
