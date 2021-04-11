import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { MIN_RENT_DAYS } from '@shared/constants';
import { IDateProvider } from '@shared/container/providers';

import { ICarsRepository } from '@modules/cars/repositories';

import { Rent } from '@modules/rents/entities';
import { IRentsRepository } from '@modules/rents/repositories';

interface IRequest {
  user_id: string;
  rent_id: string;
}

@injectable()
class DevolutionRentUseCase implements IBaseUseCase {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ rent_id }: IRequest): Promise<Rent> {
    const rent = await this.rentsRepository.findById(rent_id);

    if (!rent) {
      throw new AppError('rent_is_not_registered');
    }

    const car = await this.carsRepository.findById(rent.car_id);

    if (!car) {
      throw new AppError('car_is_not_registered');
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rent.expected_return_date, dateNow);

    if (daily <= 0) {
      daily = MIN_RENT_DAYS;
    }

    const delay = this.dateProvider.compareInDays(dateNow, rent.expected_return_date);

    let total = 0;

    if (daily > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rent.end_date = dateNow;
    rent.total = total;

    await this.rentsRepository.save(rent);
    await this.carsRepository.updateAvailable(car.id, true);

    return rent;
  }
}

export { DevolutionRentUseCase };
