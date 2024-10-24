import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './components/dashboard-sidebar';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarTrigger className="absolute top-2 left-2" />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
}
