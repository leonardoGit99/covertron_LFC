"use client"

import * as React from "react"
import Link from "next/link"
import { GiKangaroo } from 'react-icons/gi'
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"



const components: { title: string; href: string; description: string }[] = [
  {
    title: "Fundas",
    href: "/productos/fundas",
    description:
      "Descubre nuestras fundas protectoras hechas a medida y con diseños exclusivos"
  },
  {
    title: "Ropa",
    href: "/productos/ropa",
    description:
      "Viste con estilo. Descubre nuestra selección de prendas que marcan tendencia y acompañan tu día a día",
  },
  {
    title: "Accesorios",
    href: "/productos/accesorios",
    description:
      "Elige accesorios de acero inoxidable, diseñados para hombres y mujeres que buscan estilo duradero y versátil",
  }
]
// This component is used to create a navigation menu with items
function NbDesktopItems() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >

                    <GiKangaroo className="text-3xl" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      COVERTRON
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Diseño que te cuida. Estilo que te representa
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/acercade" title="Covertron">
                ¿Quiénes somos?
              </ListItem>
              <ListItem href="/servicios" title="Servicios">
                Conoce todo lo que hacemos y encuentra la combinación perfecta entre protección y moda
              </ListItem>
              <ListItem href="#" title="Item 3">
                Descripcion 3
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Nuestro Catálogo</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/contacto" className={navigationMenuTriggerStyle()}>
              Contacto
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}
export default NbDesktopItems;

// This component is used to create a list item for the navigation menu
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


