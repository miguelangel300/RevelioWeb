'use client';

import { m, type HTMLMotionProps } from 'framer-motion';

type RevealProps = HTMLMotionProps<'div'> & {
  /** Retardo en segundos, para escalonar bloques hermanos. */
  delay?: number;
  /** Cuantos pixeles sube el bloque al aparecer. */
  y?: number;
};

/**
 * Aparicion al hacer scroll: fundido y subida corta, una sola vez.
 * El atributo data-reveal lo usa el <noscript> del layout para
 * dejar el contenido visible si no hay JavaScript.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  ...rest
}: RevealProps) {
  return (
    <m.div
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
