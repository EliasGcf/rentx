import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors';
import { Car } from '@modules/cars/entities';
import { IBaseUseCase } from '@shared/useCases';
import { ICarsRepository, ISpecificationsRepository } from '@modules/cars/repositories';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationsUseCase implements IBaseUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('car_already_registered');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    car.specifications = specifications;

    await this.carsRepository.save(car);

    return car;
  }
}

export { CreateCarSpecificationsUseCase };
