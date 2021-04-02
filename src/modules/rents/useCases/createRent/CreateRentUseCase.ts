import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { MIN_RENT_HOURS } from '@shared/constants';
import { IDateProvider } from '@shared/container/providers';
import { IRentsRepository } from '@modules/rents/repositories';
import { Rent } from '@modules/rents/infra/typeorm/entities/Rent';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentUseCase implements IBaseUseCase {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rent> {
    const openRentByUser = await this.rentsRepository.findOpenRentByUserId(user_id);

    if (openRentByUser) {
      throw new AppError('There is a rent in progress with this user.');
    }

    const openRentByCar = await this.rentsRepository.findOpenRentByCarId(car_id);

    if (openRentByCar) {
      throw new AppError('There is a rent in progress with this car.');
    }

    const compare = this.dateProvider.compareInHours(new Date(), expected_return_date);

    if (compare < MIN_RENT_HOURS) {
      throw new AppError(`Expected return date is less than ${MIN_RENT_HOURS}h.`);
    }

    const rent = await this.rentsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rent;
  }
}

export { CreateRentUseCase };
