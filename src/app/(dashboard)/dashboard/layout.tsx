import { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import Providers from "./providers";
import Sidebar from "../_components/SideBar";
import "../../globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { SidebarProvider } from "@/context/SidebarContext";
import NotificationToast from "@/components/common/notifications/NotificationToast";

export const metadata: Metadata = {
  title: "داشبورد وب سایت - کلینیک ابراز",
  description: "داشبورد وب سایت - کلینیک ابراز",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <ThemeProvider>
        <Toaster />
        <Providers>
          <UserProvider>
            <SidebarProvider>
              <div className="h-screen flex bg-gray-100 dark:bg-gray-900">
                <Sidebar />

                <main className="flex-1 lg:mr-80 overflow-y-auto h-screen">
                  <NotificationToast />
                  {children}
                </main>

                <Toaster />
              </div>
            </SidebarProvider>
          </UserProvider>
        </Providers>
      </ThemeProvider>
    </div>
  );
}
