import { db } from "@/db";
import { carwashLocations } from "@/db/schema";
import { ClientHomePage } from "./page.client";

export default async function Home() {
	const markers = await db.select().from(carwashLocations);

	return <ClientHomePage markers={markers} />;
}
