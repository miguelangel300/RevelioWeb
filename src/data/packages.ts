export type Paquete = {
  slug: string;
  name: string;
  /** Precio final para los novios, en euros. Ya incluye el 10% de comision. */
  price: number;
  /** El que mas contratan. Solo uno deberia llevarlo. */
  destacado?: boolean;
  equipo: string;
  fotografia: string;
  video?: string;
  entrega: string;
};

export type Extra = {
  name: string;
  /** null cuando hay que consultarlo. */
  price: number | null;
  nota?: string;
};

/** Cobertura comun a todos los packs. */
export const cobertura = 'Desde los preparativos hasta una hora de barra libre';

/** La galeria web se sirve durante este tiempo. */
export const vigenciaGaleria = '6 meses';

export const paquetes: Paquete[] = [
  {
    slug: 'esencial-foto',
    name: 'Esencial Foto',
    price: 880,
    equipo: '1 fotógrafo',
    fotografia: '350+ fotos editadas en alta resolución',
    entrega: '5 fotos de adelanto en 48 h y galería web',
  },
  {
    slug: 'cobertura-total-foto',
    name: 'Cobertura Total Foto',
    price: 1200,
    destacado: true,
    equipo: '2 fotógrafos',
    fotografia: '700+ fotos editadas en alta resolución',
    entrega: '10 fotos de adelanto en 48 h y galería web',
  },
  {
    slug: 'duo-equilibrio',
    name: 'Dúo Equilibrio',
    price: 1800,
    equipo: '1 fotógrafo y 1 videógrafo',
    fotografia: '600+ fotos editadas',
    video: 'Highlight de 3-5 min y documental de 15-20 min, con audio real',
    entrega: 'Galería web y vídeos en 4K',
  },
  {
    slug: 'experiencia-cinematica',
    name: 'Experiencia Cinemática',
    price: 2100,
    equipo: '2 fotógrafos y 1 videógrafo',
    fotografia: '900+ fotos editadas',
    video: 'Highlight de 3-5 min y documental de 20-25 min',
    entrega: 'Galería web y vídeos en 4K',
  },
];

export const extras: Extra[] = [
  { name: 'Sesión de preboda o postboda', price: 150, nota: 'Solo fotógrafo' },
  { name: 'Fotomatón, 2 horas', price: 500 },
  { name: 'Videobooth, 2 horas', price: 350 },
  { name: 'Fotomatón y videobooth, 2 horas', price: 700 },
  { name: 'Hora extra por fotógrafo', price: 100 },
  { name: 'Álbum impreso personalizado', price: null, nota: 'Consultadnos' },
];

/** Tipo de IVA general. Los precios de arriba van sin el. */
export const IVA = 0.21;

/** Lo que acaba pagando la pareja. */
export const conIva = (valor: number) =>
  Math.round(valor * (1 + IVA) * 100) / 100;

/**
 * Formatea un importe en euros al modo espanol. A mano y no con
 * toLocaleString: el separador de miles depende del ICU que traiga Node
 * y no queremos que cambie segun donde se compile.
 */
export const euros = (valor: number) => {
  const [entero, decimales] = valor.toFixed(2).split('.');
  const conMiles = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decimales === '00' ? `${conMiles} €` : `${conMiles},${decimales} €`;
};

/** El pack mas barato, para el "desde" de los textos y la FAQ. */
export const precioDesde = Math.min(...paquetes.map((p) => p.price));
