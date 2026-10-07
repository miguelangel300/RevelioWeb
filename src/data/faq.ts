import { euros, paquetes, precioDesde } from '@/data/packages';

export type FaqItem = {
  /** Identificador estable, para elegir que preguntas salen en cada pagina. */
  id: string;
  question: string;
  answer: string;
};

/**
 * Fuente unica de las preguntas frecuentes.
 * La home las muestra todas y alimenta el JSON-LD de FAQPage.
 * La pagina de contacto muestra el subconjunto de contactFaqIds.
 */
export const faqs: FaqItem[] = [
  {
    id: 'precio',
    question: '¿Cuánto cuesta un reportaje de boda?',
    answer:
      `Nuestros packs de fotografía empiezan en ${euros(precioDesde)} más IVA y los de foto más vídeo en ${euros(paquetes.find((p) => p.video)!.price)} más IVA. Todos cubren desde los preparativos hasta una hora de barra libre. Contadnos vuestra fecha y el sitio y os pasamos el presupuesto cerrado.`,
  },
  {
    id: 'entrega',
    question: '¿Cuándo tendremos las fotos de la boda?',
    answer:
      'Os mandamos cinco fotos de adelanto en 48 horas, para que tengáis algo que enseñar mientras todavía estáis con la resaca del día. La galería completa y editada os llega entre 3 y 6 semanas después de la boda.',
  },
  {
    id: 'cobertura',
    question: '¿Trabajáis fuera de Sevilla?',
    answer:
      'Sí. Cubrimos toda Andalucía: Cádiz, Huelva, Córdoba, Málaga, Granada, Jaén y Almería. Y también viajamos fuera, sea una playa o un pueblo de montaña. Si vuestra finca está lejos, decídnoslo y lo hablamos sin problema.',
  },
  {
    id: 'antelacion',
    question: '¿Con cuánta antelación hay que reservar la fecha?',
    answer:
      'Lo normal es entre 8 y 12 meses antes. Dicho esto, si tenemos vuestra fecha libre nos apuntamos aunque quede poco tiempo. Escribidnos y lo miramos.',
  },
  {
    id: 'video',
    question: '¿Hacéis también vídeo?',
    answer:
      'Sí, somos estudio de foto y vídeo. Podéis contratar solo la fotografía o las dos cosas. Si van juntas nos coordinamos entre nosotros y no notaréis dos equipos encima.',
  },
  {
    id: 'preboda',
    question: '¿Hacéis sesiones de preboda o postboda?',
    answer:
      'Sí, y las recomendamos. La preboda sirve para que os soltéis delante de la cámara antes del día grande. La postboda es volver a poneros el traje sin prisas ni horarios, y de ahí suelen salir las fotos más libres.',
  },
  {
    id: 'poses',
    question: '¿Nos vais a hacer posar todo el rato?',
    answer:
      'No. Trabajamos en documental: nos movemos por la boda y vamos capturando lo que pasa de verdad. Reservamos un rato corto para vosotros dos y poco más. La idea es que os olvidéis de la cámara.',
  },
  {
    id: 'mascotas',
    question: '¿Puede salir nuestro perro o nuestro gato en las fotos?',
    answer:
      'Claro. Las mascotas son parte de la familia y nos encanta que estén. Contádnoslo antes para tenerlo previsto en el horario del día.',
  },
];

/** Las que se muestran en la pagina de contacto, en este orden. */
const contactFaqIds = ['cobertura', 'entrega', 'antelacion', 'preboda'];

export const contactFaqs: FaqItem[] = contactFaqIds.map((id) => {
  const item = faqs.find((faq) => faq.id === id);
  if (!item) throw new Error(`Falta la pregunta "${id}" en faqs`);
  return item;
});
