'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import Noise from '@/components/noise';

import Logo from './logo';

const GENERAL_INFO = [{
  data:[
    {name: 'Federazione d’Imprese per la Tutela e la Promozione del Made in Italy'},
    {name: 'Via Federico Cesi, 44 - 00193 ROMA'},
  ],
  links:[
    {
      name: 'info@federitaly.it',
      href: 'mailto:info@federitaly.it',
    },
    {
      name: 'TEL: +39 06 21119763',
      href: 'tel:+390621119763',
    },
    {
      name: 'WHATSAPP: +39 351 5692010',
      href: 'https://wa.me/+393515692010',
      },
  ]
},
];

const LEGAL_INFO = [
  {
    title: 'Informazioni Legali',
    data: [
      {name:'Sede Legale: Corso della Repubblica, 205 - 03043 CASSINO (FR)'},
      {name:'Cod. Fiscale: 90046140605'},
    ],
    links: [
      {
        name: 'PEC: federitaly@legalmail.it',
        href: 'mailto:federitaly@legalmail.it',
      },
      {
        name: 'Privacy Policy',
        href: '/privacy-policy',
      },
      { 
        name: 'Cookie Policy', 
        href: '/cookie-policy',
      },
    ],
  },
];

const SOCIAL = [{
  title: 'Social',
  links: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/federitaly',
    },
    {
      name: 'X',
      href: 'https://x.com/FEDERITALY2021',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/federitaly/',
    },
  ],
},
];

const Footer = () => {
  const pathname = usePathname();

  const hideFooter = [
    '/signin',
    '/signup',
    '/docs',
    '/not-found',
    '/forgot-password',
  ].some((route) => pathname.includes(route));

  if (hideFooter) return null;

  return (
    <footer className="relative py-12 bg-secondary rounded-t-5xl">
      <Noise />

      <div className="container">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">

          <div className="flex w-fit flex-col items-start justify-start md:col-span-1">
            <Logo onlyLogo={true} />
            <div className="mt-4 space-y-3 md:mt-8">
            {GENERAL_INFO.map((section, index) => (
              <div key={index}>
                <ul className="space-y-3">
                  {section?.data?.map((data, dataIndex) => (
                    <li key={dataIndex} className='text-background text-sm transition-colors'>                    
                        {data.name}
                    </li>
                  ))}
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-background hover:text-input hover:underline text-sm transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:col-span-1">
            {LEGAL_INFO.map((section, index) => (
              <div key={index}>
                <h3 className="!text-background text-lg mb-4 md:mb-8 h-8">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section?.data?.map((data, dataIndex) => (
                    <li key={dataIndex} className='text-background text-sm transition-colors'>                    
                        {data.name}
                    </li>
                  ))}
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-background hover:text-input hover:underline text-sm transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:col-span-1">
            {SOCIAL.map((section, index) => (
              <div key={index}>
                <h3 className="!text-background text-lg mb-4  md:mb-8 h-8">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-background hover:text-input hover:underline text-sm transition-colors flex items-center gap-2"
                      >
                        {link.name} <ArrowUpRight className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-15 flex flex-col items-center justify-between gap-4 md:mt-20 md:flex-row">
          <div className="flex gap-6">
            <Link
              href="https://www.federitaly.it"
              className="text-background hover:text-input hover:underline text-sm transition-colors"
            >
              © {new Date().getFullYear()} Federitaly
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
