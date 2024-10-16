import { ClientHomePage } from "./page.client";
import { Sidebar } from "./components/sidebar";
import { getLocationsAction } from "./actions/actions";

export default async function Home({
	searchParams,
}: {
	searchParams: {
		q?: string;
	};
}) {
	const query = searchParams.q;
	const [locations] = await getLocationsAction({ query });

	return (
		<main className="bg-gray-950 flex">
			<Sidebar initialLocations={locations || []} />
			<div className="rounded-lg w-full overflow-hidden">
				<ClientHomePage markers={locations || []} />
			</div>
		</main>
	);
}
