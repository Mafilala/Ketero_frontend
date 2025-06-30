import { PencilRuler,  Shirt, Ruler, ShoppingBag, LayoutList, Puzzle, User } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  } from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Clothing",
    url: "/admin?view=clothing",
    icon: Shirt,
  },
  {
    title: "Clothing Type",
    url: "/admin?view=clothing_type",
    icon: ShoppingBag,
  },
  {
    title: "Measure",
    url: "/admin?view=measure",
    icon: PencilRuler,
  },
  {
    title: "Status",
    url: "/admin?view=status",
    icon: LayoutList,
  },
  {
    title: "Clothing Part",
    url: "/admin?view=parts",
    icon: Puzzle,
  },
  {
    title: "Clothing Measures",
    url: "/admin?view=clothing_measures",
    icon: Ruler,
  },
  {
    title: "Users",
    url: "/admin?view=users",
    icon: User,
  },

]



const CustomizedGroupMenu = () => {

  return (
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
  )

}

export default CustomizedGroupMenu;
