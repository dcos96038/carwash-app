"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

export default function Page() {
	return (
		<div className="flex items-center justify-center w-full">
			<Card className="max-w-96 w-full">
				<CardHeader>
					<CardTitle>Carwash Dashboard</CardTitle>
					<CardDescription>Log in to access to the dashboard</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						onClick={() => {
							signIn("google", {
								redirectTo: "/dashboard",
							});
						}}
						className="w-full flex items-center gap-1"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-brand-google"
						>
							<title>Google</title>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
						</svg>
						Login with Google
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
