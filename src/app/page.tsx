import { ClientHomePage } from "./page.client";
import { getLocationsAction } from "./actions";

import { searchParamsCache } from "@/lib/search-params";

export default async function Home({
	searchParams,
}: {
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const { seLng, nwLat, nwLng, seLat } = searchParamsCache.parse(searchParams);

	const [locations] = await getLocationsAction({
		coords: {
			northWestLat: Number(nwLat),
			northWestLng: Number(nwLng),
			southEastLat: Number(seLat),
			southEastLng: Number(seLng),
		},
	});

	return (
		<main className="flex flex-1">
			<ClientHomePage locations={locations || []} />
		</main>
	);
}
