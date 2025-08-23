import Link from 'next/link';
import React from 'react';
import { GiKangaroo } from 'react-icons/gi';

type Props = {
  type?: 'default' | 'transparent';
  href: string;
  iconSize?: string;       // Tamaño del ícono, ej: 'text-5xl md:text-6xl'
  textSize?: string;       // Tamaño del texto principal, ej: 'text-2xl md:text-3xl'
  spanSize?: string;       // Tamaño del texto del span, ej: 'text-lg md:text-xl'
  className?: string;      // Clases extra para personalizar
};

function Logo({
  type = 'default',
  href,
  iconSize = 'text-5xl md:text-6xl',
  textSize = 'text-2xl md:text-3xl',
  spanSize = 'text-lg md:text-xl',
  className = '',
}: Props) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-0 sm:gap-2 ${
          type === 'default' ? 'text-black dark:text-white' : 'text-white'
        } ${className}`}
      >
        <GiKangaroo className={`${iconSize}`} />
        <h1 className={`${textSize}`}>
          COVER
          <span className={`font-bold ${spanSize}`}>TRON</span>
        </h1>
      </div>
    </Link>
  );
}

export default Logo;
