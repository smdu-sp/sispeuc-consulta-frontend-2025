"use client"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import MiniLogo from "./mini-logo"
import { ComponentProps } from "react"
import { IMenu } from "../main"

export function AppSidebar({ data, props }: { data: { menuUsuario: IMenu[], menuAdmin: IMenu[] }, props?: ComponentProps<typeof Sidebar>}) {
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
                <MiniLogo />
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                        SISPEUC
                    </span>
                    <span className="truncate text-xs">Consulta de processos</span>
                </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <NavMain data={data} />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
