'use client';

import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * LazyMotion + domAnimation carga solo las features que usamos
 * (opacidad y transform), no el paquete entero de framer.
 *
 * reducedMotion="user" respeta la preferencia del sistema: a quien
 * tenga "reducir movimiento" activado le quita los desplazamientos
 * y le deja solo el fundido, que es lo accesible.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
