
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const title = 'Política de Privacidad | Revelio Photography';
const description =
  'Política de privacidad de Revelio Photography: qué datos recogemos, para qué los usamos y cómo ejercer vuestros derechos.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/politica-de-privacidad',
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.siteUrl}/politica-de-privacidad`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [siteConfig.ogImage],
  },
};

export default function PrivacyPolicyPage() {
  const siteName = "Revelio Photography";
  const companyName = "Revelio Photography";
  const nif = "29532679N";
  const address = "Antonio Guzmán, 1, 41007, Sevilla, España";
  const email = "info@reveliophotography.es";

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      <Breadcrumbs name="Política de privacidad" path="/politica-de-privacidad" />
      <div className="space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-serif font-semibold text-primary mb-6">Política de Privacidad</h1>
        </section>

        <section className="space-y-4 text-foreground/80 text-base leading-relaxed">
          <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">1. Responsable del Tratamiento</h2>
          <p>
            De conformidad con el Reglamento (UE) 2016/679 General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos que el responsable del tratamiento de sus datos personales es:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Titular:</strong> {companyName}</li>
            <li><strong>NIF/CIF:</strong> {nif}</li>
            <li><strong>Domicilio Social:</strong> {address}</li>
            <li><strong>Correo Electrónico:</strong> <a href={`mailto:${email}`} className="underline hover:text-primary">{email}</a></li>
          </ul>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">2. Finalidad del Tratamiento de los Datos</h2>
          <p>
            En {siteName}, tratamos la información que nos facilita con las siguientes finalidades:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Gestionar las consultas y solicitudes de información recibidas a través del formulario de contacto o por correo electrónico, con el fin de proporcionar información sobre nuestros servicios de fotografía de bodas.</li>
            <li>Mantener el contacto y la comunicación para la prestación de los servicios contratados.</li>
            <li>Cumplir con las obligaciones legales y fiscales que se deriven de la relación comercial.</li>
          </ul>
          <p>
            Los datos personales proporcionados a través del formulario de contacto se conservarán hasta el día de la boda, después de lo cual serán eliminados. Los datos necesarios para cumplir con obligaciones legales y fiscales se conservarán durante los años establecidos por la legislación aplicable.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">3. Legitimación para el Tratamiento</h2>
          <p>
            La base legal para el tratamiento de sus datos es su consentimiento explícito, que se solicita a través de la marcación de la casilla de aceptación en el formulario de contacto, así como la ejecución de un precontrato o contrato de servicios en caso de que decida contratar nuestros servicios.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">4. Destinatarios de los Datos</h2>
          <p>
            Sus datos personales no serán cedidos a terceros, salvo que exista una obligación legal. No obstante, para llevar a cabo la gestión administrativa, fiscal y contable, sus datos podrán ser comunicados a gestorías o asesorías.
          </p>
          <p>
            No se realizarán transferencias internacionales de datos a países fuera de la Unión Europea.
          </p>

          <h2 className="text-2xl font-serif font-semibold text-primary pt-6">5. Derechos del Interesado</h2>
          <p>
            Usted tiene derecho a obtener confirmación sobre si en {companyName} estamos tratando sus datos personales. Como interesado, tiene derecho a ejercer los siguientes derechos:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Derecho de Acceso:</strong> A saber qué datos suyos estamos tratando.</li>
            <li><strong>Derecho de Rectificación:</strong> A solicitar la modificación de los datos que sean inexactos.</li>
            <li><strong>Derecho de Supresión (o &quot;al olvido&quot;):</strong> A solicitar la eliminación de sus datos cuando, entre otros motivos, ya no sean necesarios para los fines que fueron recogidos.</li>
            <li><strong>Derecho a la Limitación del Tratamiento:</strong> En determinadas circunstancias, podrá solicitar la limitación del tratamiento de sus datos, en cuyo caso únicamente se conservarán para el ejercicio o la defensa de reclamaciones.</li>
            <li><strong>Derecho de Oposición:</strong> A oponerse al tratamiento de sus datos. {companyName} dejará de tratar los datos, salvo por motivos legítimos imperiosos, o el ejercicio o la defensa de posibles reclamaciones.</li>
            <li><strong>Derecho a la Portabilidad de los Datos:</strong> A recibir sus datos personales en un formato estructurado, de uso común y lectura mecánica, y a transmitirlos a otro responsable.</li>
          </ul>
          <p>
            Puede ejercer sus derechos enviando una comunicación por escrito al domicilio social de {companyName} o a la dirección de correo electrónico {email}, incluyendo en ambos casos fotocopia de su DNI u otro documento de identificación similar.
          </p>
          <p>
            Asimismo, si considera que no ha obtenido satisfacción plena en el ejercicio de sus derechos, podrá presentar una reclamación ante la autoridad de control nacional, dirigiéndose a estos efectos a la Agencia Española de Protección de Datos, C/ Jorge Juan, 6 – 28001 Madrid.
          </p>
           <h2 className="text-2xl font-serif font-semibold text-primary pt-6">6. Exactitud y Veracidad de los Datos</h2>
          <p>
            El usuario es el único responsable de la veracidad y corrección de los datos incluidos, exonerando a {companyName} de cualquier responsabilidad al respecto. Los usuarios garantizan y responden, en cualquier caso, de la exactitud, vigencia y autenticidad de los datos personales facilitados, y se comprometen a mantenerlos debidamente actualizados.
          </p>
        </section>
      </div>
    </div>
  );
}
