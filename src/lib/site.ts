const FALLBACK_SITE_URL = "https://reveliophotography.es";

export const siteConfig = {
  name: "Revelio Photography",
  title: "Fotografos de Bodas en Sevilla | Revelio Photography",
  description:
    "Fotografia de bodas en Sevilla y Andalucia, natural y sin poses forzadas. Capturamos emocion real, fiesta y momentos unicos de vuestro gran dia.",
  locale: "es_ES",
  siteUrl: (process.env.NEXT_PUBLIC_BASE_URL || FALLBACK_SITE_URL).replace(/\/$/, ""),
};
