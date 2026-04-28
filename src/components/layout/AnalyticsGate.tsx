'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const CONSENT_KEY = 'cookie_consent';
const CONSENT_EVENT = 'cookie-consent-updated';

export default function AnalyticsGate() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setHasConsent(localStorage.getItem(CONSENT_KEY) === 'true');
    };

    syncConsent();
    window.addEventListener('storage', syncConsent);
    window.addEventListener(CONSENT_EVENT, syncConsent);

    return () => {
      window.removeEventListener('storage', syncConsent);
      window.removeEventListener(CONSENT_EVENT, syncConsent);
    };
  }, []);

  if (!hasConsent) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
