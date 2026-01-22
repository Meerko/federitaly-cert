import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Gloock } from 'next/font/google';


import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { StyleGlideProvider } from '@/components/styleglide-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

import SilktideConsent from '@/components/cookie/SilktideConsent';
import Script from 'next/script';

const inter = Inter({
  variable: '--font-epilogue',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
const gloock = Gloock({
  variable: '--font-gloock',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.federitaly.it'),
  title: {
    default: 'Federitaly - Federazione di imprese per la tutela e la promozione del Made in Italy nel mondo',
    template: '%s | Federitaly',
  },
  description:
    'Federazione di imprese per la tutela e la promozione del Made in Italy nel mondo',
  keywords: [
    'Federitaly',
    'Made in Italy',
    'federazione imprese italiane',
    'rappresentanza imprese',
    'tutela delle imprese',
    'certificazione made in italy',
    'internazionalizzazione imprese',
    'certificazioni di qualità',
    'sostenibilità aziendale',
  ],
  authors: [{ name: 'Federitaly' }],
  creator: 'Mirko Maggiore - Web & Comumunication Designer ',
  publisher: 'Federitaly',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  openGraph: {
    title: 'Federitaly',
    description:
      'Federazione di imprese per la tutela e la promozione del Made in Italy nel mondo',
    siteName: 'Federitaly',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Federitaly - Federazione di imprese per la tutela e la promozione del Made in Italy nel mondo',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          id="silktide-consent-manager-css"
          href="/cookie-banner/silktide-consent-manager.css"
        />
      </head>
      <body
        className={cn(
          'flex min-h-screen flex-col antialiased [--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*23)]',
          inter.variable, gloock.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <StyleGlideProvider />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <SilktideConsent />
        <Script
          id="ga-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                functionality_storage: 'denied',
                personalization_storage: 'denied',
                security_storage: 'granted'
              });
            `,
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R1MWDY0P91"
          strategy="afterInteractive"
        />

        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('js', new Date());
              gtag('config', 'G-R1MWDY0P91', { anonymize_ip: true });
            `,
          }}
        />
      </body>
    </html>
  );
}
