'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Marquee } from '@/components/magicui/marquee';
import Noise from '@/components/noise';
import { cn } from '@/lib/utils';

const companies = [
  {
    name: 'Orygin',
    logo: '/images/logos/origyn-logo.png',
    className: 'dark:hidden',
    url: 'https://origyn.org',
  },
  {
    name: 'Internet Computer',
    logo: '/images/logos/ic-logo.png',
    className: 'dark:hidden',
    url: 'https://internetcomputer.org',
  },
  {
    name: 'QMS Italia',
    logo: '/images/logos/qms.webp',
    className: '',
    url: 'https://qmsitalia.it',
  },
  {
    name: 'MIMIT',
    logo: '/images/logos/mimit-logo.png',
    className: 'dark:hidden',
    url: 'https://mimit.it',
  },
  {
    name: 'European Parliament',
    logo: '/images/logos/eu-parl-logo.png',
    className: '',
    url: 'https://europarl.europa.eu',
  },
];

export default function Logos() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter out companies with dark:hidden when theme is dark
  // Only apply theme-based filtering after component is mounted to prevent hydration mismatch
  const visibleCompanies = companies.filter((company) => {
    if (
      mounted &&
      theme === 'dark' &&
      company.className.includes('dark:hidden')
    ) {
      return false;
    }
    return true;
  });

  return (
    <section className="section-padding !pb-0 relative">
      <Noise />
      <p className="container text-center text-base">
        Accreditati e riconosciuti dalle principali fondazioni e istituzioni italiane e europee.
      </p>

      <div>
        <Marquee
          pauseOnHover
          className="mt-8 mask-r-from-60% mask-r-to-65% mask-l-from-60% mask-l-to-65% [--duration:20s] [--gap:4rem]"
        >
          {visibleCompanies.map((company) => (
            <Link
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-12 w-32 transition-transform duration-200 hover:scale-105"
            >
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                fill
                className={cn('object-contain', company.className)}
              />
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
