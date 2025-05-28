import Link from 'next/link'
import React from 'react'
import { Separator } from "./ui/separator"
import { GiKangaroo } from 'react-icons/gi'

function Footer() {
  const dataFooter = [
    {
      id: 1,
      title: 'Sobre nosotros',
      link: '/acercade'
    }, {
      id: 2,
      title: 'Nuestro catálogo',
      link: '/productos'
    }, {
      id: 3,
      title: 'Contacto',
      link: '/contacto'
    }
  ]
  return (
    <footer className='mt-4'>
      <div className='h-full  max-h-screen-xl mx-auto p-4 md:py-8 sm:max-w-6xl'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <div className='flex items-center gap-1'>
            <GiKangaroo className='text-2xl' />
            <p className='text-xl'>
              COVER
              <span className='font-bold text-sm'>
                TRON
              </span>
            </p>
          </div>
          <ul className='flex flex-wrrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
            {
              dataFooter.map((data) => (
                <li key={data.id}>
                  <Link
                    href={data.link}
                    className='hover:underline me-4 md:me-4'
                  >
                    {data.title}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        <Separator className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          &copy; {new Date().getFullYear()} {" "}
          <span >
            <Link href="#">
              Covertron. {" "}
            </Link>
            Todos los derechos reservados. Desarrollado por {" "}
            <Link href="https://leonardo-fuentes-claros.vercel.app" className='font-semibold hover:underline'>
            Leonardo Fuentes Claros
            </Link>
          </span>

        </span>
      </div>
    </footer>
  )
}

export default Footer