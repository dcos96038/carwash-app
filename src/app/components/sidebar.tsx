"use client";

import { CarFront, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import type { Carwash } from "@/types/carwash.types";

import { Button } from "@/components/ui/button";

import { LocationButton } from "./location-button";

interface SidebarProps {
  locations: Carwash[];
}

export const Sidebar: React.FC<SidebarProps> = ({ locations }) => {
  const session = useSession();

  return (
    <div className="flex min-w-96 flex-col gap-4 px-4 pt-6 text-gray-200">
      <div className="flex items-center justify-center gap-1">
        <CarFront />
        <h1 className="text-center text-xl font-semibold">Carwash App</h1>
      </div>
      {session.status === "authenticated" && (
        <div className="flex items-center justify-between">
          <p className="text-sm italic text-gray-500">
            Logged in as {session.data.user.email}
          </p>
          <Button
            size={"sm"}
            type="button"
            onClick={async () => {
              await signOut();
            }}
            className="flex items-center gap-1"
          >
            Logout <LogOutIcon size={14} />
          </Button>
        </div>
      )}
      <Button asChild>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>

      <div className="flex flex-col gap-2">
        {locations.length ? (
          locations.map((l) => <LocationButton key={l.id} location={l} />)
        ) : (
          <div className="text-center text-gray-400">No locations found</div>
        )}
      </div>
    </div>
  );
};
