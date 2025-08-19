'use client';

import React from 'react';
import { GiKangaroo } from 'react-icons/gi';
import { cn } from '../../lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import Link from 'next/link';

type Props = {
  type?: 'default' | 'transparent';
};

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Productos',
    href: '/productos',
    description:
      'Descubre nuestros productos hechos a medida y con diseños exclusivos',
  },
];

// This component is used to create a navigation menu with items
function NbDesktopItems({ type = 'default' }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${
              type === 'default'
                ? 'text-black'
                : 'text-white bg-transparent transition-colors hover:bg-transparent hover:text-slate-300 focus:text-slate-300 data-[state=open]:text-slate-300 data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent focus:bg-transparent'
            }`}
          >
            Sobre nosotros
          </NavigationMenuTrigger>
          <NavigationMenuContent
          /* className={`${type === 'default' ? 'bg-white' : 'bg-foreground'}`} */
          >
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-8 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <GiKangaroo className="text-4xl" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      COVERTRON
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Diseño que te cuida. Estilo que te representa
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/#servicios"
                title="Servicios"
              >
                Conoce todo lo que hacemos y encuentra la combinación perfecta
                entre protección y moda
              </ListItem>
              <ListItem
                href="/#acerca-de"
                title="Covetron"
              >
                ¿Quienes somos?
              </ListItem>
              <ListItem
                href="/#razones"
                title="Razones para elegirnos"
              >
                ¿Qué nos distingue?
              </ListItem>
              <ListItem
                href="/#preguntas-frecuentes"
                title="Preguntas frecuentes"
              >
                Resuelve tus dudas
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${
              type === 'default'
                ? 'text-black'
                : 'text-white bg-transparent transition-colors hover:bg-transparent hover:text-slate-300 focus:text-slate-300 data-[state=open]:text-slate-300 data-[state=open]-bg-none data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent focus:bg-transparent'
            }`}
          >
            Nuestro Catálogo
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[300px] md:grid-cols-1 lg:w-[400px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
export default NbDesktopItems;

// This component is used to create a list item for the navigation menu
type ListItemProps = {
  title: string;
  href: string; // obligatorio y siempre string
  children: React.ReactNode;
  className?: string;
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ title, href, children, className, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={href} // ahora TypeScript sabe que es string
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
