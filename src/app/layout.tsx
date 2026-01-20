import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Gloock } from 'next/font/google';
import { cookies } from 'next/headers';

import Banner from '@/components/layout/banner';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { StyleGlideProvider } from '@/components/styleglide-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

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
  twitter: {
    card: 'summary_large_image',
    title: 'Federitaly',
    description:
      'Federazione di imprese per la tutela e la promozione del Made in Italy nel mondo',
    images: ['/og-image.jpg'],
    creator: 'Mirko Maggiore - Web & Communication Designer',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read banner dismissed state from cookies (server-side)
  const cookieStore = await cookies();
  const bannerDismissed = cookieStore.get('banner-dismissed')?.value === 'true';

  return (
    <html lang="en" suppressHydrationWarning>
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
          <Banner
            url="https://www.federitaly.it/bando"
            initialVisible={!bannerDismissed}
          />
          <Navbar initialBannerVisible={!bannerDismissed} />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
