
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AuthWrapper from '@/components/authWrapper/wrapper'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex  w-full">
        <SidebarTrigger />
        <AuthWrapper>
          {children} 
        </AuthWrapper>
      </main>
    </SidebarProvider>
  )
}
