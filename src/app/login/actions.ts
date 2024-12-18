"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import z from "zod";

import { actionClient } from "@/lib/safe-action-clients";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    try {
      await signIn("credentials", {
        email: parsedInput.email,
        password: parsedInput.password,
        redirect: false,
      });
    } catch (error) {
      throw new Error("Invalid email or password", { cause: error });
    }

    redirect("/dashboard");
  });
