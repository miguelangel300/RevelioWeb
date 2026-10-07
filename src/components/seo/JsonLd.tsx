/**
 * Inyecta un bloque JSON-LD en el HTML.
 * Escapa "<" para que un texto con etiquetas no pueda cerrar el <script>.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
