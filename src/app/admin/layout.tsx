import { auth } from "@/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./components/admin-sidebar";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session) {
		redirect("/login");
	}

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
