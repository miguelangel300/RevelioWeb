import { paquetes } from '@/data/packages';
import { siteConfig } from '@/lib/site';

/**
 * Datos NAP (Name, Address, Phone) de Revelio.
 * Fuente unica de verdad para los datos estructurados.
 */
export const businessInfo = {
  legalName: 'Revelio Photography',
  founder: 'Alejandro Montalvo Carrasco',
  email: 'info@reveliophotography.es',
  phone: '+34698480039',
  addressLocality: 'Sevilla',
  addressRegion: 'Andalucía',
  addressCountry: 'ES',
  logo: '/logoRevelio%20completo%20sin%20fondo.png',
  /** Ficha de Google Business Profile, verificada. */
  googleBusinessProfile: 'https://share.google/aqJfNCjZetmW58qjt',
  socials: [
    'https://www.instagram.com/reveliophotography_/',
    'https://www.tiktok.com/@reveliophotography',
  ],
} as const;

/**
 * Grafo principal de datos estructurados del sitio:
 * ProfessionalService + LocalBusiness, la Person que lo firma y el WebSite.
 */
export function getBusinessSchema() {
  const url = siteConfig.siteUrl;
  const businessId = `${url}/#business`;
  const personId = `${url}/#alejandro`;
  const websiteId = `${url}/#website`;
  const logoUrl = `${url}${businessInfo.logo}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': businessId,
        name: businessInfo.legalName,
        legalName: businessInfo.legalName,
        description: siteConfig.description,
        url: `${url}/`,
        image: logoUrl,
        logo: logoUrl,
        telephone: businessInfo.phone,
        email: businessInfo.email,
        inLanguage: 'es-ES',
        currenciesAccepted: 'EUR',
        address: {
          '@type': 'PostalAddress',
          addressLocality: businessInfo.addressLocality,
          addressRegion: businessInfo.addressRegion,
          addressCountry: businessInfo.addressCountry,
        },
        areaServed: [
          { '@type': 'City', name: 'Sevilla' },
          { '@type': 'AdministrativeArea', name: 'Andalucía' },
        ],
        serviceType: 'Fotografía y vídeo de bodas',
        knowsAbout: [
          'Fotografía de bodas',
          'Vídeo de bodas',
          'Fotografía documental de bodas',
          'Bodas en Sevilla',
          'Bodas en Andalucía',
          'Sesiones de preboda y postboda',
          'Fotografia de bodas con mascotas',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: businessInfo.phone,
          email: businessInfo.email,
          areaServed: 'ES',
          availableLanguage: ['Spanish'],
        },
        founder: { '@id': personId },
        sameAs: [...businessInfo.socials, businessInfo.googleBusinessProfile],
        hasMap: businessInfo.googleBusinessProfile,
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '09:00',
            closes: '21:00',
          },
        ],
        priceRange: '€€',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Reportajes de boda',
          itemListElement: paquetes.map((paquete) => ({
            // Sin precio a proposito: la pagina de packs ya no los muestra y
            // Google exige que el dato estructurado coincida con lo visible.
            // La cifra de partida vive en la FAQ, que si es contenido visible.
            '@type': 'Offer',
            name: paquete.name,
            url: `${url}/precios#${paquete.slug}`,
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Service',
              name: paquete.name,
              serviceType: paquete.video
                ? 'Fotografía y vídeo de bodas'
                : 'Fotografía de bodas',
              description: [paquete.equipo, paquete.fotografia, paquete.video]
                .filter(Boolean)
                .join('. '),
              provider: { '@id': businessId },
              areaServed: 'Andalucía',
            },
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: businessInfo.founder,
        jobTitle: 'Fotógrafo de bodas',
        worksFor: { '@id': businessId },
        url: `${url}/sobre-nosotros`,
        sameAs: [...businessInfo.socials],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${url}/`,
        name: siteConfig.name,
        inLanguage: 'es-ES',
        publisher: { '@id': businessId },
      },
    ],
  };
}

/**
 * FAQPage. Solo debe usarse en la pagina donde las preguntas
 * se ven de verdad (la home), no en el layout global.
 */
export function getFaqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteConfig.siteUrl}/#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList. Google la usa para pintar la ruta en los resultados
 * en lugar de la URL cruda.
 */
export function getBreadcrumbSchema(trail: readonly { name: string; path: string }[]) {
  const crumbs = [{ name: 'Inicio', path: '/' }, ...trail];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.siteUrl}${crumb.path}`,
    })),
  };
}

/**
 * ItemList de proveedores recomendados. Le dice a Google y a las IAs
 * que esta pagina es una lista de negocios, no prosa suelta.
 */
export function getCollaboratorsSchema(
  items: readonly {
    name: string;
    description: string;
    city: string;
    website?: string;
    instagram: string;
  }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Proveedores de boda recomendados por Revelio Photography',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Organization',
        name: item.name,
        description: item.description,
        areaServed: item.city,
        ...(item.website ? { url: item.website } : {}),
        sameAs: [item.website, item.instagram].filter(Boolean),
      },
    })),
  };
}
