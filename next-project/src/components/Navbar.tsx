import Link from 'next/link'
import React from 'react'
import { IoSunny } from 'react-icons/io5'
import { GiKangaroo } from 'react-icons/gi'

import NbDesktopItems from './NbDesktopItems'
import NbMobileItems from './NbMobileItems'

function Navbar() {
  return (
    <div className='fixed top-0 left-0 right-0 z-50 h-[5.75rem] bg-white shadow-sm'>
      <div className='flex items-center justify-between py-4 mx-auto cursor-pointer sm:max-w-6xl'>
        <Link href={'/'} >
          <div className='flex items-center gap-2'>
            <GiKangaroo className='text-6xl' />
            <h1 className='text-3xl'>
              COVER
              <span className='font-bold text-xl'>TRON</span>
            </h1>
          </div>
        </Link>
        <div className='items-center justify-between hidden sm:flex'>
          <NbDesktopItems />
        </div>
        <div className='flex sm:hidden'>
          <NbMobileItems />
        </div>
        <div className='flex items-center justify-between gap-2 sm:7'>
          <IoSunny className='cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Navbar