import { searchParamsCache } from "@/lib/search-params";

import { getLocationsAction } from "./actions";
import ClientHomePage from "./page.client";

export default async function Home(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const { seLng, nwLat, nwLng, seLat } = searchParamsCache.parse(searchParams);

  const locations = await getLocationsAction({
    coords: {
      northWestLat: nwLat,
      northWestLng: nwLng,
      southEastLat: seLat,
      southEastLng: seLng,
    },
  });

  return (
    <main className="flex flex-1">
      <ClientHomePage locations={locations?.data || []} />
    </main>
  );
}
