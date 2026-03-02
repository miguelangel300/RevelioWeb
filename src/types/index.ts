export interface Photo {
  id: string;
  src: string;
  alt: string;
  dataAiHint: string;
  height?: number; // Propiedad opcional para la altura
  category?: string; // e.g. 'Bodas', 'Retratos', 'Detalles', 'Editorial'
  title?: string;
  tags?: string[]; // e.g. ['Luz natural', 'Blanco y Negro']
}
