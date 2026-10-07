export type Collaborator = {
  slug: string;
  name: string;
  /** Que hacen, en dos palabras. Sale como etiqueta en la tarjeta. */
  category: string;
  /** Zona donde trabajan. */
  city: string;
  description: string;
  website?: string;
  instagram: string;
  /** Ruta dentro de /public. Si no hay logo, la tarjeta pone el nombre. */
  logo?: string;
};

/**
 * Proveedores con los que colaboramos de verdad.
 * Orden: primero los que cubren Sevilla, que es donde caen casi todas
 * nuestras bodas. Para anadir uno nuevo basta con meterlo aqui: la
 * pagina, el JSON-LD y el llms.txt salen de esta lista.
 */
export const collaborators: Collaborator[] = [
  {
    slug: 'clara-martin',
    name: 'Clara Martín',
    category: 'Maestra de ceremonias',
    city: 'Sevilla',
    description:
      'Oficia bodas simbólicas hechas a medida, en español, inglés o francés. Escribe vuestra historia de amor, coordina el día y deja la ceremonia en 25-40 minutos. También hace elopements y renovaciones de votos.',
    website: 'https://www.maestradeceremonias-sevilla.com',
    instagram: 'https://www.instagram.com/maestradeceremonias.sevilla/',
  },
  {
    slug: 'jumpinggo',
    name: 'JumpinGo',
    category: 'Fotomatón y videobooth',
    city: 'Sevilla',
    description:
      'Fotomatón y videobooth para bodas en Sevilla. Son a quienes llamamos cuando una pareja nos pregunta por fotomatón aquí.',
    instagram: 'https://www.instagram.com/jumpinggo.es/',
  },
  {
    slug: 'good-party',
    name: 'Good Party',
    category: 'Animación y hora loca',
    city: 'Sevilla',
    description:
      'Animación de bodas y hora loca. Los que entran cuando la fiesta necesita un empujón y hay que levantar a todo el mundo de la silla.',
    instagram: 'https://www.instagram.com/goodparty.es/',
  },
  {
    slug: 'catering-alboroto',
    name: 'Catering Alboroto',
    category: 'Catering',
    city: 'Sevilla',
    description: 'Catering de bodas y eventos en Sevilla.',
    instagram: 'https://www.instagram.com/cateringalborotosevilla/',
  },
  {
    slug: 'vive-el-momento',
    name: 'Vive el Momento',
    category: 'Fotomatón y experiencias 360º',
    city: 'Provincia de Cádiz',
    description:
      'Fotomatón de espejo y plataforma 360º. Trabajan la provincia de Cádiz, así que son la opción si vuestra boda cae por allí. Montan, iluminan y dejan el álbum impreso y la galería digital.',
    website: 'https://viveelmomento.es/',
    instagram: 'https://www.instagram.com/viveelmomento_fotomaton/',
    logo: '/colaboradores/vive-el-momento.jpg',
  },
];
