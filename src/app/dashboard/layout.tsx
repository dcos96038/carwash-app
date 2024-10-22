import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session) {
		redirect("/login");
	}

	return <div className="flex min-h-screen w-full">{children}</div>;
}
