import type { Carwash } from '@/types/carwash.types';
import { db } from '../../db';
import { carwash } from '../../db/schema/carwash';
import { CreateCarwash } from '@/app/(authenticated)/admin/carwash/schemas';
import { CommonOptions } from '@/types/common.types';

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

  async getMany(options: CommonOptions<Carwash>): Promise<Carwash[]> {
    const { page, limit, sortBy, filter } = options;

    const results = await this.db.query.carwash.findMany({
      limit,
      offset: page * limit,
      ...(sortBy && {
        orderBy: (carwash, { asc, desc }) =>
          Object.entries(sortBy).map(([key, value]) => {
            const columnKey = key as keyof Carwash;
            return value === 'asc'
              ? asc(carwash[columnKey])
              : desc(carwash[columnKey]);
          }),
      }),
      ...(filter && {
        where: (carwash, { ilike }) => {
          const columnKey = filter.key as keyof Carwash;
          return ilike(carwash[columnKey], `%${filter.value}%`);
        },
      }),
    });

    return results;
  }

  async getTotalCount(): Promise<number> {
    return await this.db.$count(carwash);
  }

  async insertCarwash(input: CreateCarwash): Promise<Carwash> {
    const result = await this.db.insert(carwash).values([input]).returning();

    const insertedCarwash = result.pop();

    if (!insertedCarwash) {
      throw new Error('Failed to insert carwash');
    }

    return insertedCarwash;
  }
}
