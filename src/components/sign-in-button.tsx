"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignInBtnAuto() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				Signed in as {session.user.email} <br />
				<Button type="button" onClick={() => signOut()}>
					Sign out
				</Button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<Button type="button" onClick={() => signIn()}>
				Sign in
			</Button>
		</>
	);
}
