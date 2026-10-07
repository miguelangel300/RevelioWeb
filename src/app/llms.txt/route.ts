import { collaborators } from '@/data/collaborators';
import { cobertura, euros, extras, paquetes, precioDesde } from '@/data/packages';
import { faqs } from '@/data/faq';
import { businessInfo } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * llms.txt: resumen en texto plano del negocio para crawlers de IA.
 * Se genera desde las mismas fuentes que el resto del sitio, asi que
 * no se queda desincronizado.
 */
export function GET() {
  const url = siteConfig.siteUrl;

  const body = [
    `# ${siteConfig.name}`,
    '',
    `> Estudio de fotografía y vídeo de bodas en ${businessInfo.addressLocality}, con cobertura en toda Andalucía. Estilo documental: gente pasándoselo bien, sin poses forzadas.`,
    '',
    `Revelio Photography es el estudio de ${businessInfo.founder}. Cubrimos bodas en Sevilla y en el resto de Andalucía (Cádiz, Huelva, Córdoba, Málaga, Granada, Jaén y Almería), y también bodas de destino. Trabajamos foto y vídeo, y hacemos sesiones de preboda y postboda.`,
    '',
    '## Datos de contacto',
    '',
    `- Correo: ${businessInfo.email}`,
    `- Teléfono y WhatsApp: ${businessInfo.phone}`,
    `- Zona de servicio: ${businessInfo.addressLocality}, ${businessInfo.addressRegion} y resto de España`,
    ...businessInfo.socials.map((social) => `- Perfil: ${social}`),
    '',
    '## Páginas',
    '',
    `- [Inicio](${url}/): quiénes somos, cómo trabajamos y preguntas frecuentes.`,
    `- [Sobre nosotros](${url}/sobre-nosotros): nuestro enfoque documental y las bodas con mascotas.`,
    `- [Galería](${url}/galeria): reportajes completos de bodas reales.`,
    `- [Contacto](${url}/contacto): formulario, teléfono y disponibilidad de fechas.`,
    `- [Precios](${url}/precios): los cuatro packs con precio y qué incluye cada uno.`,
    `- [Colaboradores](${url}/colaboradores): proveedores de boda con los que trabajamos.`,
    '',
    '## Precios',
    '',
    `Cobertura común a todos los packs: ${cobertura.toLowerCase()}. Los packs de fotografía empiezan en ${euros(precioDesde)} más IVA; el presupuesto cerrado se da por fecha y lugar.`,
    '',
    ...paquetes.map(
      (paquete) =>
        `- ${paquete.name}: ${[paquete.equipo, paquete.fotografia, paquete.video, paquete.entrega].filter(Boolean).join('. ')}.`,
    ),
    '',
    'Extras: ' + extras.map((extra) => extra.name).join(', ') + '.',
    '',
    '## Proveedores que recomendamos',
    '',
    ...collaborators.map(
      (item) =>
        `- ${item.name} (${item.category}, ${item.city}): ${item.description} ${item.website ?? item.instagram}`,
    ),
    '',
    '## Preguntas frecuentes',
    '',
    ...faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
