import type { Carwash } from '@/types/carwash.types';
import { db } from '../../db';
import { carwash } from '../../db/schema/carwash';
import { CreateCarwash } from '@/app/(authenticated)/admin/carwash/schemas';

export class CarwashService {
  private readonly db = db;

  async getByCoords(coords?: {
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

  async getByName(searchQuery: string): Promise<Carwash[]> {
    return await this.db.query.carwash.findMany({
      where: (locations, { ilike }) =>
        ilike(locations.name, `%${searchQuery}%`),
    });
  }

  async insertCarwash(input: CreateCarwash): Promise<Carwash> {
    const result = await this.db.insert(carwash).values([input]).returning();

    const insertedCarwash = result.pop();

    if (!insertedCarwash) {
      throw new Error('Failed to insert carwash');
    }

    return insertedCarwash;
  }

  async getCarwashLength(): Promise<number> {
    const carwash = await this.db.query.carwash.findMany();
    return carwash.length;
  }
}
