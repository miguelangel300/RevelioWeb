import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Rutas traducidas al castellano. Las inglesas siguen respondiendo con
  // una redireccion permanente (308), asi no se rompe ningun enlace ya
  // publicado ni se pierde lo que Google tuviera indexado.
  async redirects() {
    return [
      { source: '/about', destination: '/sobre-nosotros', permanent: true },
      { source: '/gallery', destination: '/galeria', permanent: true },
      { source: '/contact', destination: '/contacto', permanent: true },
      { source: '/privacy-policy', destination: '/politica-de-privacidad', permanent: true },
      { source: '/cookie-policy', destination: '/politica-de-cookies', permanent: true },
      { source: '/legal-notice', destination: '/aviso-legal', permanent: true },
      { source: '/accessibility-statement', destination: '/accesibilidad', permanent: true },
    ];
  },
  // Sin red de seguridad a proposito: si TypeScript o ESLint fallan, el
  // despliegue se para en vez de publicar algo roto.
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
