import { getRepository, IsNull, Repository } from 'typeorm';

import { ICreateRentDTO } from '@modules/rents/dtos/ICreateRentDTO';
import { IRentsRepository } from '@modules/rents/repositories';

import { Rent } from '../entities/Rent';

class RentsRepository implements IRentsRepository {
  private ormRepository: Repository<Rent>;

  constructor() {
    this.ormRepository = getRepository(Rent);
  }

  async create({ user_id, car_id, expected_return_date }: ICreateRentDTO): Promise<Rent> {
    const rent = this.ormRepository.create({ user_id, car_id, expected_return_date });

    await this.ormRepository.save(rent);

    return rent;
  }

  async findOpenRentByCarId(car_id: string): Promise<Rent | undefined> {
    const rent = await this.ormRepository.findOne({
      where: {
        car_id,
        end_date: IsNull(),
      },
    });

    return rent;
  }

  async findOpenRentByUserId(user_id: string): Promise<Rent | undefined> {
    const rent = await this.ormRepository.findOne({
      where: {
        user_id,
        end_date: IsNull(),
      },
    });

    return rent;
  }
}

export { RentsRepository };
