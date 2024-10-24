import { auth } from '@/auth';
import { LogoutButton } from '@/components/logout-button';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { UserRolesEnum } from '@/types/user.types';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  // {
  //   title: "Inbox",
  //   url: "#",
  //   icon: Inbox,
  // },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  // 	title: "Settings",
  // 	url: "/settings",
  // 	icon: Settings,
  // },
];

export const DashboardSidebar = async () => {
  const session = await auth();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Dashboard</span>
            <SidebarTrigger />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {session?.user.role === UserRolesEnum.ADMIN && (
          <Button asChild>
            <Link href="/admin">Admin Panel</Link>
          </Button>
        )}
        <LogoutButton />
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
