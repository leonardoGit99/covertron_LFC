import { VscGraphLine } from "react-icons/vsc"
import { IoCartOutline } from "react-icons/io5"
import { HiOutlineFolder } from "react-icons/hi";
import { HiOutlineCollection } from "react-icons/hi";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { ModeToggle } from "@/components/ui/toggle-theme";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: VscGraphLine,
  },
  {
    title: "Categorias",
    url: "/admin/categorias",
    icon: HiOutlineFolder,
  },
  {
    title: "Sub-categorias",
    url: "/admin/subcategorias",
    icon: HiOutlineCollection,
  },
  {
    title: "Productos",
    url: "/admin/productos",
    icon: IoCartOutline,
  }
]

export function AppSidebar() {
  return (
    <Sidebar className="z-50">
      <SidebarContent className="bg-[#000319]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-50 flex items-center justify-between mb-3 mt-2 md:mb-0 md:mt-0">
            Covertron - Administrador 
           <div className="block md:hidden">
             <ModeToggle type="transparent" />
           </div>
            </SidebarGroupLabel>
          <SidebarGroupContent className="text-slate-400">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className="hover:bg-[#1a1f33] hover:text-slate-400">
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
