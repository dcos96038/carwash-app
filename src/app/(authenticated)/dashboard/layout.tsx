import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { DashboardSidebar } from "./components/dashboard-sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarTrigger className="absolute left-2 top-2" />
      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
}
