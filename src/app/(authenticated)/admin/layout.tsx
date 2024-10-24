import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from './components/admin-sidebar';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarTrigger className="absolute top-2 left-2" />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
}
