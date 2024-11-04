import dynamic from "next/dynamic";

import { searchParamsCache } from "@/lib/search-params";

import { getLocationsAction } from "./actions";

const ClientHomePage = dynamic(() => import("./page.client"), {
  ssr: false,
});

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { seLng, nwLat, nwLng, seLat } = searchParamsCache.parse(searchParams);

  const locations = await getLocationsAction({
    coords: {
      northWestLat: Number(nwLat),
      northWestLng: Number(nwLng),
      southEastLat: Number(seLat),
      southEastLng: Number(seLng),
    },
  });

  return (
    <main className="flex flex-1">
      <ClientHomePage locations={locations?.data || []} />
    </main>
  );
}
