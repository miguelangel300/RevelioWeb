'use client';

import { m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fundido corto al cambiar de pagina.
 *
 * Dos decisiones importantes:
 * - En la primera carga no anima (initial={false}), asi el HTML del
 *   servidor sale ya visible y no retrasamos el LCP del hero.
 * - Solo opacidad, sin transform: un ancestro transformado romperia
 *   cualquier position:fixed que haya dentro de la pagina.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const firstPath = useRef(pathname);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const isFirstRender = !hydrated && pathname === firstPath.current;

  return (
    <m.div
      key={pathname}
      initial={isFirstRender ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  );
}
