import type { CarwashLocation } from "@/types/locations.types";
import { db } from "../../db";
import { carwashLocations } from "../../db/schema";
import { ilike } from "drizzle-orm/pg-core/expressions";

export class LocationsService {
	private readonly db = db;
	private readonly table = carwashLocations;

	async getMarkers(query?: string): Promise<CarwashLocation[]> {
		const data = this.db.select().from(this.table);

		if (query) {
			return await data.where(ilike(this.table.name, `%${query}%`));
		}

		return await data;
	}
}
