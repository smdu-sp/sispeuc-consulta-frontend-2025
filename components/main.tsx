'use client'

import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BookOpen, Bot, House, LucideProps, SquareTerminal, Users } from "lucide-react"
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import { DrawerMenu } from "./drawer-menu"
import { ModeToggle } from "./toggle-theme"

export interface IMenu {
  icone: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  titulo: string
  url?: string
  subItens?: ISubMenu[]
}

export interface ISubMenu {
  titulo: string
  url: string
}

const menuUsuario: IMenu[] = [
  {
    icone: House,
    titulo: "Página Inicial",
    url: "/"
  }
]

const menuAdmin: IMenu[] = [
  {
    icone: Users,
    titulo: "Usuários",
    url: "/usuarios",
  }
]

export default function Main({ children }: { children?: ReactNode}) {
  return (
    <>
      <ModeToggle className="absolute top-4 right-4 z-50" />
      <SidebarProvider>
        <AppSidebar data={{menuUsuario, menuAdmin}} />
        <SidebarInset>
          <header className="h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 hidden sm:flex">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <House size={16} />
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 sm:pt-0 relative">
            <div className="min-h-100 flex-1 rounded-xl md:min-h-min pt-10 sm:pt-0">
              {children}
            </div>
          </div>
        </SidebarInset>
        <DrawerMenu data={{ menuUsuario, menuAdmin }} />
      </SidebarProvider>
    </>
  )
}
