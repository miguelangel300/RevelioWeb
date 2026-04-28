
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const CONSENT_EVENT = 'cookie-consent-updated';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setIsVisible(false);
  };

  const handleClose = () => {
    // Optionally, you could set a different localStorage item here
    // like 'cookie_consent_dismissed' if you want to differentiate
    // between explicit acceptance and just closing the banner.
    // For simplicity, we'll treat closing as acceptance for now.
    localStorage.setItem('cookie_consent', 'true');
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-4 md:py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start text-sm text-foreground/90">
            <Cookie className="h-5 w-5 mr-3 mt-0.5 shrink-0 text-primary" />
            <p>
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestro uso de cookies. Puedes obtener más información en nuestra{' '}
              <Link href="/cookie-policy" className="underline hover:text-primary">
                Política de Cookies
              </Link>.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button onClick={handleAccept} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Aceptar
            </Button>
            <Button onClick={handleClose} variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar banner de cookies</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
