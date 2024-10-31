import { Service } from '@/types/services.types';
import { db } from '../../db';

export class ServicesService {
  private readonly db = db;

  async getServices(): Promise<Service[]> {
    return await this.db.query.service.findMany();
  }

  async createService(data: Service): Promise<Service> {
    return await this.db.query.service.create({ data });
  }
}
