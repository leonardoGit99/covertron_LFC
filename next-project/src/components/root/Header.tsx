import React from 'react';
import Logo from '../shared/Logo';
import { ModeToggle } from '../ui/toggle-theme';
import { SidebarTrigger } from '../ui/sidebar';

function Header() {
  return (
    <div className=" bg-white w-full h-[5.75rem] shadow-sm dark:bg-backgroundDark shadow-gray-400 sticky top-0 z-50">
      <SidebarTrigger className="absolute top-2 left-2" />
      <div className="flex justify-between items-center max-w-5xl mx-auto h-full">
        <Logo
          type="default"
          href="/admin"
        />
        <ModeToggle type="default" />
      </div>
    </div>
  );
}

export default Header;
