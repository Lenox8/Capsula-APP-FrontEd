"use client"

import React from "react";
import Link from "next/link";
import { LogOut, Moon, PanelBottom, Settings, Sun, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useSidebar } from "@/components//ui/sidebar";

const DashNav = () => {

  const { theme, setTheme } = useTheme()
  const { toggleSidebar } = useSidebar()

  return (
    <nav className="flex py-6 px-4 items-center justify-between">
      {/* Left Side */}
      <a href="#" className="sr-only">
        Open Side Menu
      </a>
      {/* SidebarTrigger  */}
      <Button variant="outline" onClick={toggleSidebar} className="mr-auto cursor-e-resize">
        <PanelBottom />
      </Button>
      {/* Right side */}
      <div className="flex items-center gap-4">
        <Link href="/">Dashboard</Link>

        {/* theme provider menu dark and light or system */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* user menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel className="text-md select-none">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuItem className="flex gap-2 text-md select-none">
              <User className="w-4 h-4 text-gray-700 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 text-gray-700 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <LogOut className="w-4 h-4  mr-2 text-red-500 " />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashNav;
