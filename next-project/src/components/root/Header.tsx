import React from 'react'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'

function Header() {
  return (
    <div className=' bg-white w-full h-[5.75rem] shadow-sm'>
      <SidebarTrigger />
      <div className='flex justify-between items-center px-7'>
        <div>
          LOGO
        </div>
        <div>
          ContextBtn
        </div>
      </div>
    </div>
  )
}

export default Header