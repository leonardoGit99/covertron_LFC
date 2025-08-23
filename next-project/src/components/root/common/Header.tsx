import React from 'react';
import Logo from '@/components/shared/Logo';
import { ModeToggle } from '@/components/ui/toggle-theme';
import { SidebarTrigger } from '@/components/ui/sidebar';

function Header() {
  return (
    <div className=" bg-white w-full h-[5.75rem] shadow-sm dark:bg-backgroundDark shadow-gray-400 sticky top-0 z-40">
      <SidebarTrigger className="absolute right-4 top-8 md:top-2 md:left-2 active:bg-transparent" />
      <div className="flex justify-between items-center max-w-5xl mx-auto h-full">
        <div className="pl-4 md:pl-0">
          <Logo
            type="default"
            href="/admin"
          />
        </div>
        <div className="hidden md:block">
          <ModeToggle type="default" />
        </div>
      </div>
    </div>
  );
}

export default Header;
