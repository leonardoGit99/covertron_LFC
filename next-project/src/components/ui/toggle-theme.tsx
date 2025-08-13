'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

type Props = {
  type?: 'default' | 'transparent';
};

export function ModeToggle({ type = 'default' }: Props) {
  const { setTheme } = useTheme();

  return (
    <div className="hidden sm:block">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          asChild
          className={`${type === 'default' ? 'text-black' : 'text-white bg-transparent hover:bg-transparent hover:text-white'} border-none shadow-none`}
        >
          <Button
            variant="outline"
            size="icon"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
        >
          <DropdownMenuItem onClick={() => setTheme('light')}>
            Claro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            Oscuro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            Sistema
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
