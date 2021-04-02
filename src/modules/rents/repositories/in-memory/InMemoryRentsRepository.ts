import { ICreateRentDTO } from '@modules/rents/dtos/ICreateRentDTO';
import { Rent } from '@modules/rents/infra/typeorm/entities/Rent';

import { IRentsRepository } from '../IRentsRepository';

class InMemoryRentsRepository implements IRentsRepository {
  private rents: Rent[] = [];

  async create(data: ICreateRentDTO): Promise<Rent> {
    const rent = new Rent();

    Object.assign(rent, data, { start_date: new Date() });

    this.rents.push(rent);

    return rent;
  }

  async findOpenRentByCarId(car_id: string): Promise<Rent | undefined> {
    return this.rents.find(rent => rent.car_id === car_id && !rent.end_date);
  }

  async findOpenRentByUserId(user_id: string): Promise<Rent | undefined> {
    return this.rents.find(rent => rent.user_id === user_id && !rent.end_date);
  }
}

export { InMemoryRentsRepository };
