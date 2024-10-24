import { LogoutButton } from "@/components/logout-button";
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
import { Users } from "lucide-react";
import Link from "next/link";

const items = [
	{
		title: "Users",
		url: "/admin",
		icon: Users,
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
				<LogoutButton />
				<div className="text-center text-sm text-gray-500">
					© {new Date().getFullYear()} All rights reserved
				</div>
			</SidebarFooter>
		</Sidebar>
	);
};
