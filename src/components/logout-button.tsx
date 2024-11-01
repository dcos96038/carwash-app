"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  return (
    <Button
      type="button"
      onClick={async () => {
        await signOut({
          redirectTo: "/",
        });
      }}
      className="flex items-center justify-between gap-1"
    >
      Logout <LogOutIcon size={14} />
    </Button>
  );
};
