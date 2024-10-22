"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";

export default function Page() {
	const { execute, isPending } = useServerAction(login);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const [, error] = await execute(formData);

		if (error) {
			toast.error(error.message);
		} else {
			toast.success(`Logged in as ${formData.get("email")}`);
		}
	};

	return (
		<div className="flex items-center justify-center w-full">
			<Card className="max-w-96 w-full">
				<CardHeader>
					<CardTitle>Carwash Admin Panel</CardTitle>
					<CardDescription>Log in to access the admin panel</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} aria-disabled={isPending}>
						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-1">
								<Label htmlFor="email">Your email address</Label>
								<Input id="email" type="email" name="email" required />
							</div>
							<div>
								<Label htmlFor="password">Your password</Label>
								<Input id="password" type="password" name="password" required />
							</div>
							<Button type="submit">Login</Button>
						</div>
					</form>
				</CardContent>
				{/* <CardFooter><p>Card Footer</p></CardFooter> */}
			</Card>
		</div>
	);
}
