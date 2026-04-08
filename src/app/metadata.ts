import { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

const baseUrl = siteConfig.siteUrl

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: baseUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
}