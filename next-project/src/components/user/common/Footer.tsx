import Link from 'next/link';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { GiKangaroo } from 'react-icons/gi';
import Logo from '../../shared/Logo';

function Footer() {
  const dataFooter = [
    {
      id: 1,
      title: 'Servicios',
      link: '/#servicios',
    },
    {
      id: 2,
      title: 'Nosotros',
      link: '/#acerca-de',
    },

    {
      id: 3,
      title: 'Razones',
      link: '/#razones',
    },
    {
      id: 4,
      title: 'Catálogo',
      link: '/productos',
    },
    {
      id: 5,
      title: 'Contacto',
      link: '/',
    },
  ];
  return (
    <footer className="mt-4 md:h-[180px] dark:bg-backgroundDark">
      <div className="h-full  max-h-screen-xl mx-auto p-4 md:py-8 sm:max-w-6xl">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center gap-1">
            <Logo
              href="/"
              type="default"
              iconSize='text-2xl md:text-3xl'
              textSize='text-lg md:text-xl'
              spanSize='text-sm md:text-base'
            />
          </div>
          <ul className="flex flex-wrrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-300">
            {dataFooter.map((data) => (
              <li key={data.id}>
                <Link
                  href={data.link}
                  className="hover:underline me-2 md:me-4 text-xs md:text-sm"
                >
                  {data.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-6 border-gray-200 sm:mx-auto dark:border dark:border-slate-600 lg:my-8" />
        <span className="block text-xs md:text-sm text-gray-500 sm:text-center dark:text-gray-300">
          &copy; {new Date().getFullYear()}{' '}
          <span>
            <Link href="#">Covertron. </Link>
            Todos los derechos reservados. Desarrollado por{' '}
            <Link
              href="https://leonardo-fuentes-claros.vercel.app"
              className="font-semibold hover:underline"
            >
              Leonardo Fuentes Claros
            </Link>
          </span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
