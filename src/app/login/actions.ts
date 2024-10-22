"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import z from "zod";
import { createServerAction, ZSAError } from "zsa";

export const login = createServerAction()
	.input(
		z.object({
			email: z.string(),
			password: z.string(),
		}),
		{
			type: "formData",
		},
	)
	.handler(async ({ input }) => {
		try {
			await signIn("credentials", {
				email: input.email,
				password: input.password,
				redirect: false,
			});
		} catch (error) {
			throw new ZSAError("NOT_AUTHORIZED", "Invalid email or password");
		}

		redirect("/dashboard");
	});
