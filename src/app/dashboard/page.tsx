import { auth } from "@/auth";
import { LogoutButton } from "./components/logout-button";

export default async function Page() {
	const session = await auth();

	if (!session) {
		throw new Error("Not authenticated");
	}

	return (
		<div className="flex items-center justify-center w-full flex-col gap-4">
			<h1 className="text-4xl font-semibold text-center">Welcome</h1>

			<div>
				<pre className="text-lg italic font-medium">
					{JSON.stringify(session.user, null, 2)}
				</pre>
			</div>

			<LogoutButton />
		</div>
	);
}
