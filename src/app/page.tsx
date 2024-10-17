import { ClientHomePage } from "./page.client";
import { Sidebar } from "./components/sidebar";
import { getLocationsAction } from "./actions/actions";
import { MapProvider } from "@/context/use-map";
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
		<main className="bg-gray-950 flex flex-1">
			<MapProvider>
				<ClientHomePage locations={locations || []} />
			</MapProvider>
		</main>
	);
}
