import { VscGraphLine } from "react-icons/vsc"
import { MdLabelOutline } from "react-icons/md"
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
    <Sidebar>
      <SidebarContent className="bg-[#000319]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-50">Covertron - Administrador</SidebarGroupLabel>
          <SidebarGroupContent className="text-slate-400">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className="hover:bg-[#1a1f33] hover:text-slate-400">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
