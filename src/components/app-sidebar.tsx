import {
  Sidebar,
  SidebarContent,
  } from "@/components/ui/sidebar"

import CustomizeSidebarGroup from "./sidebarGroup"
import CustomizedGroupMenu from "./CustomizedGroupMenu"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <CustomizeSidebarGroup group_name="Clothing">
          <CustomizedGroupMenu />
        </CustomizeSidebarGroup> 

      </SidebarContent>
    </Sidebar>
  )
}
