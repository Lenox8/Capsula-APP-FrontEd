import Navbar from "@/components/dashboardNav/DashNav";
import AppSideBar from "@/components/appsidebar/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers"
import { AosInit } from "@/components/aos/aos.init";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
     <AppSideBar />
      <main className="w-full h-screen">
        <Navbar />
        <div className="px-4 py-2">
          <Toaster position="bottom-right" reverseOrder={false} />  {/*toaster */}
          {children}
        </div>
      </main>
      <AosInit />
    </SidebarProvider>
  );
}
