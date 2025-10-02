"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import {
  LogOut,
  Menu,
  Settings,
  User,
  X,
  Moon,
  Sun,
  LogIn
} from "lucide-react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropMenu, setDropMenu] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const [isLogged, SetIsLogged] = useState(false);
   const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
    const token = Cookies.get("token");
    SetIsLogged(!!token);
    
  }, []);
  if(!mounted){
    return null
  }

  const handleLogout = () => {
    Cookies.remove("token");
    SetIsLogged(false);
    setOpen(false);
    toast.error("Sessao encerrada com sucesso!", {
          duration: 2000, 
          position: "top-right",
        });
    router.replace('/login')
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 space-y-4 mx-auto border-b border-black z-50 sticky top-0 bg-white/20">
      <div>
        <h2 className="text-[25px] select-none italic">
          Time
          <span className="text-[24px] font-semibold italic select-none">
            Nest
          </span>
        </h2>
      </div>
      {/* desktop */}
      <div className="hidden lg:flex ">
        <ul className="flex items-center justify-center gap-10 text-[19px]">
          <Link href="/homepage">Home</Link>
          <a href="#aboutUs" onClick={(e) => {e.preventDefault()
            const about = document.getElementById("aboutUs")
            about?.scrollIntoView({ behavior: "smooth"})
          }}>About Us</a>
          <Link href="/dashboard">Services</Link>
          <a href="https://wa.me/258847072832">Contact</a>
          {!isLogged && (
            <Tooltip>
              <TooltipTrigger>
                <Link href="/signUp" className="flex gap-3">
                  <h2 className="border rounded-md px-3 py-1 flex items-center justify-center ">Sign up</h2>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="text-[18px]">
                <p>Sign In</p>
              </TooltipContent>
            </Tooltip>
          )}
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

          {isLogged && (
            <DropdownMenu open={dropMenu} onOpenChange={setDropMenu}>
              <DropdownMenuTrigger>
                <Avatar className="hidden lg:block md:block cursor-pointer">
                  <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" />
                  <AvatarFallback>LM</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> Settings
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      variant="destructive"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Confirm Log Out of Account
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Logging out will end your current session
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </ul>
      </div>
      {/* menu btn */}
      <button className="lg:hidden block" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>
      {/* mobile view */}
      {open && (
        <div className="fixed top-15 left-0 w-full shadow-md z-50 lg:hidden ">
          <ul className="flex flex-col items-center gap-12 text-[19px]">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/" onClick={() => setOpen(false)}>
              About Us
            </Link>
            <Link href="/" onClick={() => setOpen(false)}>
              Service
            </Link>
            <Link
              href="https://wa.me/258847072832"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
            <Avatar onClick={(e) => e.preventDefault()}>
              <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" />
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition mb-4"
            >
              Sign up
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
