import { ICreateRentDTO, IFindAllByUserIdOptionsDTO } from '@modules/rents/dtos';
import { Rent } from '@modules/rents/entities';

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

  async findById(id: string): Promise<Rent | undefined> {
    return this.rents.find(rent => rent.id === id);
  }

  async save(rent: Rent): Promise<void> {
    const rentIndex = this.rents.findIndex(findRent => findRent.id === rent.id);

    this.rents[rentIndex] = rent;
  }

  async findAllByUserId(
    user_id: string,
    _?: IFindAllByUserIdOptionsDTO,
  ): Promise<Rent[]> {
    const rents = this.rents.filter(rent => rent.user_id === user_id);

    return rents;
  }
}

export { InMemoryRentsRepository };
