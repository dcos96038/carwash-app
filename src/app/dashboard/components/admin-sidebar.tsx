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
} from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import { LogoutButton } from "./logout-button";

const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
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

export const AdminSidebar = () => {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="flex items-center justify-between">
						<span>Admin Panel</span>
						<SidebarTrigger />
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<LogoutButton />
				<div className="text-center text-sm text-gray-500">
					© {new Date().getFullYear()} All rights reserved
				</div>
			</SidebarFooter>
		</Sidebar>
	);
};
