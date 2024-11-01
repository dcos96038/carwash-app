import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AdminSidebar } from "./components/admin-sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarTrigger className="absolute left-2 top-2" />
      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
}
