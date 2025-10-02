'use client'
import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Home,
  Archive,
  User,
  Clock,
  Settings,
  PlusCircle,
  User2,
  LogOut,
  ChevronUp,
  Container,
  ContainerIcon,
  ArchiveRestoreIcon,
  User2Icon,
  UserCircle2Icon,
  StopCircle,
} from "lucide-react";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Cookies from "js-cookie";
import axios from "axios";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/homepage",
    icon: Home,
  },
  {
    title: "Criar Cápsula",
    url: "/dashboard/create",
    icon: PlusCircle,
  },
  {
    title: "Pendentes",
    url: "/capsulas/pendentes",
    icon: Clock,
  },
  {
    title: "Entregues",
    url: "/capsulas/entregues",
    icon: Archive,
  },
  {
    title: "Meu Perfil",
    url: "/perfil",
    icon: User,
  },
  {
    title: "Minhas Capsulas",
    url: "/dashboard",
    icon: ArchiveRestoreIcon,
  },
  {
    title: "Canceladas",
    url: "/",
    icon: StopCircle,
  },
];

const footerItem = [
  {
    title: "Username",
    url: "/",
    icon: User,
  },
];
const AppSideBar = () => {
  const [user, setUser] = useState<{ nome: string, email: string } | null>(null)

  useEffect(() =>{
    const token = Cookies.get("token")
   const fetchUser = async () =>{
     if(token){
      const res = await axios.get("http://localhost:8000/api/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(res.data)
    }
   }
   fetchUser()
  },)
  return (

      <Sidebar collapsible="icon" side="left">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroupLabel className="text-[18px] font-semibold select-none italic mb-3">
            User Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="mb-4 px-4 text-[16px] select-none">
                    <a href={menu.url}>
                      <menu.icon />
                      <span>{menu.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {footerItem.map((menu, index) => (
              <SidebarMenuItem key={index}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      className="mb-4 px-4 text-[16px]"
                    >
                      <a href={menu.url}>
                        <menu.icon />
                        {user?.nome}
                        <ChevronUp className="ml-auto" />
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="border-1 px-3 py-4 w-[250px] rounded-md select-none"
                  >
                    <DropdownMenuItem className="mb-1 text-[16px] py-1 px-2 rounded-md cursor-default">
                      <span className="flex gap-3 items-center select-none"><UserCircle2Icon />{user?.email}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="mb-1 text-[16px] py-1 px-2 rounded-md cursor-default">
                      <span className="flex gap-3 items-center select-none"><Settings />Configuracoes</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="mb-1 text-[16px] py-1 px-2 rounded-md cursor-default">
                      <span className="flex gap-3 select-none">
                        <LogOut size={22}/> Log out
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    
  );
};

export default AppSideBar;
