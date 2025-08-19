import Link from 'next/link';
import React from 'react';
import { GiKangaroo } from 'react-icons/gi';

type Props = {
  type: string;
  href: string;
};

function Logo({ type, href }: Props) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-0 sm:gap-2 ${
          type === 'default' ? 'text-black dark:text-white' : 'text-white'
        }`}
      >
        <GiKangaroo className="text-6xl" />
        <h1 className="text-3xl">
          COVER
          <span className="font-bold text-xl">TRON</span>
        </h1>
      </div>
    </Link>
  );
}

export default Logo;
