import { BASE_PATH, auth } from "@/auth";
import { MapProvider } from "@/context/use-map";
import type { PropsWithChildren } from "react";

import SessionProvider from "./session-provider";
import { Toaster } from "./ui/sonner";

export const AppProviders = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <MapProvider>{children}</MapProvider>
      <Toaster />
    </SessionProvider>
  );
};
