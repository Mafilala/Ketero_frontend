import { ChevronDown } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  
  
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";


const CustomizeSidebarGroup = ({ children, group_name }: { children: React.ReactNode, group_name: string }) => {
  return (
    <Collapsible defaultOpen>
    <SidebarGroup>
      <SidebarGroupLabel asChild>
          
      <CollapsibleTrigger>
        {group_name} 
      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
      </CollapsibleTrigger>
          
        </SidebarGroupLabel>
        <CollapsibleContent>
        <SidebarGroupContent>
          {children}
        </SidebarGroupContent>
       </CollapsibleContent> 
    </SidebarGroup>
    </Collapsible>

  )
}

export default CustomizeSidebarGroup;
