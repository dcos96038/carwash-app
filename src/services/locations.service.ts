import type { CarwashLocation } from "@/types/locations.types";
import { db } from "../../db";
import { carwashLocations } from "../../db/schema";

interface GetMarkersProps {
	searchQuery?: string;
	coords?: {
		southEastLat: number;
		southEastLng: number;
		northWestLat: number;
		northWestLng: number;
	};
}

export class LocationsService {
	private readonly db = db;
	private readonly table = carwashLocations;

	async getMarkers({
		coords,
		searchQuery,
	}: GetMarkersProps): Promise<CarwashLocation[]> {
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
			...(searchQuery &&
				searchQuery !== "" && {
					where: (locations, { ilike }) =>
						ilike(locations.name, `%${searchQuery}%`),
				}),
		});
	}
}
