import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Logo from '@/components/shared/Logo';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/toggle-theme';
import { Separator } from '@/components/ui/separator';
import { MdMiscellaneousServices } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiHelpCircle } from "react-icons/fi";


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const items = [
  {
    title: 'Servicios',
    href: '/#servicios',
    icon: <MdMiscellaneousServices />
  },
  {
    title: 'Sobre nosotros',
    href: '/#acerca-de',
    icon: <FiUser />
  },
  {
    title: 'Por qué elegirnos',
    href: '/#razones',
    icon: <FiCheckCircle />
  },
  {
    title: 'Preguntas frecuentes',
    href: '/#preguntas-frecuentes',
    icon: <FiHelpCircle />
  },
  {
    title: 'Catálogo',
    href: '/productos',
    icon: <MdOutlineCategory />
  },
  {
    title: 'Contacto',
    href: '/',
    icon: <FiMail />
  },
];
function MobileNavBar({ open, onOpenChange }: Props) {
  return (
    <>
      <Sheet
        open={open}
        onOpenChange={onOpenChange}
      >
        <SheetContent
          side="right"
          className="dark:bg-[#000319]"
        >
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between mt-4 ">
                  <Logo
                    type="default"
                    href="/"
                    iconSize='text-4xl'
                    textSize='text-xl'
                    spanSize='text-sm'
                  />
                <ModeToggle type='default'/>
              </SheetTitle>
            </SheetHeader>
            <Separator className="mt-2 mb-4" />
            <nav className="flex flex-col gap-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-md font-medium text-slate-800 hover:text-slate-950 hover:translate-x-1 transition-all duration-200 ease-in-out  dark:text-white dark:hover:text-slate-300"
                >
                  {item.icon} {item.title}
                </Link>
              ))}
            </nav>
          </>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default MobileNavBar;
