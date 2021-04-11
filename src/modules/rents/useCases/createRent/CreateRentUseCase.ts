import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { MIN_RENT_HOURS } from '@shared/constants';
import { IDateProvider } from '@shared/container/providers';

import { Rent } from '@modules/rents/entities';
import { IRentsRepository } from '@modules/rents/repositories';

import { ICarsRepository } from '@modules/cars/repositories';

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

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rent> {
    const findCar = await this.carsRepository.findById(car_id);

    if (!findCar) {
      throw new AppError('car_is_not_registered');
    }

    const openRentByUser = await this.rentsRepository.findOpenRentByUserId(user_id);

    if (openRentByUser) {
      throw new AppError('user_rent_in_progress');
    }

    const openRentByCar = await this.rentsRepository.findOpenRentByCarId(car_id);

    if (openRentByCar) {
      throw new AppError('car_rent_in_progress');
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < MIN_RENT_HOURS) {
      throw new AppError('invalid_return_rent_date');
    }

    const rent = await this.rentsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rent;
  }
}

export { CreateRentUseCase };
