import { CreateCarwash } from "@/app/(authenticated)/admin/carwash/schemas";
import { asc, desc, ilike } from "drizzle-orm";

import type { Carwash } from "@/types/carwash.types";
import { CommonOptions } from "@/types/common.types";

import { db } from "../../db";
import { carwash } from "../../db/schema/carwash";

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

  async getByName(searchQuery: string): Promise<Carwash[]> {
    return await this.db.query.carwash.findMany({
      where: (locations, { ilike }) =>
        ilike(locations.name, `%${searchQuery}%`),
    });
  }

  async getMany(options: CommonOptions<Carwash>): Promise<Carwash[]> {
    const { page, limit, sortBy, filter } = options;

    const orderBy =
      sortBy?.map(({ id, desc: sortDesc }) => {
        if (sortDesc) {
          return desc(carwash[id as keyof Carwash]);
        } else {
          return asc(carwash[id as keyof Carwash]);
        }
      }) || [];

    const where = filter && ilike(carwash[filter.key], `%${filter.value}%`);

    const results = await this.db.query.carwash.findMany({
      limit,
      offset: page * limit,
      orderBy,
      where,
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
      throw new Error("Failed to insert carwash");
    }

    return insertedCarwash;
  }
}
