import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex  w-full">
        <SidebarTrigger />
        {children} 
      </main>
    </SidebarProvider>
  )
}
