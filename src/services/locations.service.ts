import type { Carwash } from '@/types/locations.types';
import { db } from '../../db';

export class LocationsService {
  private readonly db = db;

  async getMarkers(coords?: {
    southEastLat: number;
    southEastLng: number;
    northWestLat: number;
    northWestLng: number;
  }): Promise<Carwash[]> {
    return await this.db.query.carwash.findMany({
      ...(coords && {
        where: (locations, { between }) =>
          between(
            locations.latitude,
            coords.northWestLat,
            coords.southEastLat
          ) &&
          between(
            locations.longitude,
            coords.northWestLng,
            coords.southEastLng
          ),
      }),
    });
  }

  async searchLocations(searchQuery: string): Promise<Carwash[]> {
    return await this.db.query.carwash.findMany({
      where: (locations, { ilike }) =>
        ilike(locations.name, `%${searchQuery}%`),
    });
  }
  
  async getCarwashLength() : Promise<number> {
    const carwash = await this.db.query.carwash.findMany();
    return carwash.length;
  }
  
}
