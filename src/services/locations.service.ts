import type { CarwashLocation } from "@/types/locations.types";
import { db } from "../../db";

export class LocationsService {
	private readonly db = db;

	async getMarkers(coords?: {
		southEastLat: number;
		southEastLng: number;
		northWestLat: number;
		northWestLng: number;
	}): Promise<CarwashLocation[]> {
		return await this.db.query.carwashLocations.findMany({
			...(coords && {
				where: (locations, { between }) =>
					between(
						locations.latitude,
						coords.northWestLat,
						coords.southEastLat,
					) &&
					between(
						locations.longitude,
						coords.northWestLng,
						coords.southEastLng,
					),
			}),
		});
	}

	async searchLocations(searchQuery: string): Promise<CarwashLocation[]> {
		return await this.db.query.carwashLocations.findMany({
			where: (locations, { ilike }) =>
				ilike(locations.name, `%${searchQuery}%`),
		});
	}
}
