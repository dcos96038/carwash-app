import { MapProvider } from "@/context/use-map";

import { Toaster } from "./ui/sonner";

export async function AppProviders({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <MapProvider>{children}</MapProvider>
      <Toaster />
    </>
  );
}
