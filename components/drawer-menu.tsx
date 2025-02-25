"use client"

import { ChevronRight, ChevronsUp, LucideIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ScrollArea } from "./ui/scroll-area"

export function DrawerMenu({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
        title: string
        url: string
        }[]
    }[]
}) {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="flex sm:hidden absolute bottom-0 w-full"><ChevronsUp className="scale-150" /></Button>
      </DrawerTrigger>
      <DrawerContent className="h-5/6 bg-sidebar">
        <DrawerHeader>
            <DrawerTitle className="flex w-full justify-end items-center">
                <DrawerClose asChild>
                    <Button size="icon" variant="ghost"><X /></Button>
                </DrawerClose>
            </DrawerTitle>
            <DrawerDescription className="hidden">Menu Inferior</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-full pb-32">
            <div className="mx-auto w-full max-w-sm">
                <div className="p-4 pb-0">
                    <ul className="flex w-full min-w-0 flex-col gap-1">
                        {items.map((item) => (
                            <Collapsible asChild className="group/collapsible" key={item.title}>
                                <li className="group/menu-item relative w-full">
                                    <CollapsibleTrigger className="w-full" asChild>
                                        <Button variant="ghost">
                                            {item.icon && <item.icon className="text-primary" />}
                                            <span className={(item.items && item.items.length > 0) ? "mr-auto" : ""}>{item.title}</span>
                                            {item.items && item.items.length > 0 && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                                        </Button>
                                    </CollapsibleTrigger>
                                    {item.items && item.items.length > 0 && <CollapsibleContent>
                                        <ul className="border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 pr-6 py-0.5 group-data-[collapsible=icon]:hidden w-full">
                                            {item.items.map((subitem) => (
                                                <li className="group/menu-sub-item w-full" key={subitem.title}>
                                                    <Button variant="ghost" className="w-full" asChild>
                                                        <a href={subitem.url}>
                                                            <span className="mr-auto">{subitem.title}</span>
                                                        </a>
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </CollapsibleContent>}
                                </li>
                            </Collapsible>
                        ))}
                    </ul>
                </div>
            </div>
        </ScrollArea>        
      </DrawerContent>
    </Drawer>
  )
}
