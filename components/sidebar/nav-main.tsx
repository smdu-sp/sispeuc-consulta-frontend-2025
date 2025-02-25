"use client"

import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { IMenu } from "../main"

export function NavMain({
  data
}: {
  data : {
    menuUsuario?: IMenu[],
    menuAdmin?: IMenu[]
  }
}) {
  return (
    <SidebarContent>
      <SidebarGroup>
        {data.menuUsuario && <><SidebarGroupLabel>Geral</SidebarGroupLabel>
        <SidebarMenu>
          {data.menuUsuario.map((item: IMenu, index) => (
            item.subItens ?
              <Collapsible
                key={item.titulo}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.titulo} isActive={index === 0}>
                      {item.icone && <item.icone className="text-primary" />}
                      <span>{item.titulo}</span>
                      {item.subItens && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.subItens && <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItens?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.titulo}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.titulo}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>}
                </SidebarMenuItem>
              </Collapsible>
            : <SidebarMenuItem key={item.titulo}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    {item.icone && <item.icone className="text-primary" />}
                    <span>{item.titulo}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
          ))}
        </SidebarMenu></>}
        {data.menuAdmin && <><SidebarGroupLabel>Administração</SidebarGroupLabel>
        <SidebarMenu>
          {data.menuAdmin.map((item, index) => (
            item.subItens ?
            <Collapsible
              key={item.titulo}
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.titulo} isActive={index === 0}>
                    {item.icone && <item.icone className="text-primary" />}
                    <span>{item.titulo}</span>
                    {item.subItens && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.subItens && <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subItens?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.titulo}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.titulo}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>}
              </SidebarMenuItem>
            </Collapsible>
          : <SidebarMenuItem key={item.titulo}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {item.icone && <item.icone className="text-primary" />}
                  <span>{item.titulo}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu></>}
      </SidebarGroup>
    </SidebarContent>    
  )
}
