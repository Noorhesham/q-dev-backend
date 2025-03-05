import type { Metadata } from "next";
import { AppSidebar } from "../components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import QueryProvider from "../utils/QueryProvider";
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      {" "}
      <ToastContainer />
      <main className=" w-full">
        {" "}
        <SidebarProvider>
          <AppSidebar className="z-[50] " />
          <div className="flex !text-left w-full flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </header>{" "}
            <SidebarInset className=" w-full">{children}</SidebarInset>
          </div>
        </SidebarProvider>
      </main>
    </QueryProvider>
  );
}
