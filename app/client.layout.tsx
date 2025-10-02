"use client";

import Navbar from "@/components/navbar/Navbar";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}
       <Toaster position="top-right" reverseOrder={false} />  {/*toaster */}
      <main>{children}</main>
    </>
  );
}
