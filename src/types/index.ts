export interface Photo {
  id: string;
  src: string;
  alt: string;
  dataAiHint: string;
  height?: number; // Propiedad opcional para la altura
  category?: string; // e.g. 'Bodas', 'Retratos', 'Detalles', 'Editorial'
  subFolder?: string; // e.g. 'Alejandro y Marta' (nombre de la boda)
  title?: string;
  tags?: string[]; // e.g. ['barraLibre', 'coctel', 'preboda']
}
