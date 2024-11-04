import { CreateService } from "@/app/(authenticated)/admin/services/schemas";

import { CommonOptions } from "@/types/common.types";
import { Service } from "@/types/services.types";

import { db } from "../../db";
import { service } from "../../db/schema/service";

export class ServicesService {
  private readonly db = db;

  async getServices(): Promise<Service[]> {
    return await this.db.query.service.findMany();
  }

  async insertService(input: CreateService): Promise<Service> {
    console.log("insert");
    const result = await this.db.insert(service).values([input]).returning();

    const insertedService = result.pop();

    if (!insertedService) {
      throw new Error("Failed to insert Service");
    }

    return insertedService;
  }

  async getMany(options: CommonOptions<Service>): Promise<Service[]> {
    const { page, limit, sortBy, filter } = options;

    const results = await this.db.query.service.findMany({
      limit,
      offset: page * limit,
      ...(sortBy && {
        orderBy: (service, { asc, desc }) =>
          Object.entries(sortBy).map(([key, value]) => {
            const columnKey = key as keyof Service;
            return value === "asc"
              ? asc(service[columnKey])
              : desc(service[columnKey]);
          }),
      }),
      ...(filter && {
        where: (service, { ilike }) => {
          const columnKey = filter.key as keyof Service;
          return ilike(service[columnKey], `%${filter.value}%`);
        },
      }),
    });

    return results;
  }

  async getTotalCount(): Promise<number> {
    return await this.db.$count(service);
  }
}
