import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';
interface LogoProps {
  className?: string;
  wrapperClassName?: string;
  onlyLogo?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  wrapperClassName = '',
  onlyLogo = false,
}) => {
  if (onlyLogo) {
    return (
      <div className={cn(``, wrapperClassName)}>
      <Link href="/" className={cn(`relative block h-8 w-48`, className)}>
        <Image
          src="/images/logos/federitaly-w.svg"
          alt="Federitaly Logo"
          fill
          priority
          className="object-contain"
        />
      </Link>
    </div>
    );
  }
  return (
    <div className={cn(``, wrapperClassName)}>
      <Link href="/" className={cn(`relative block h-8 w-48`, className)}>
        <Image
          src="/layout/logo.svg"
          alt="Federitaly Logo"
          fill
          priority
          className="object-contain"
        />
      </Link>
    </div>
  );
};

export default Logo;
