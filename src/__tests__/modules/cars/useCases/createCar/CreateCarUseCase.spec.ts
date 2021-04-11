import { AppError } from '@shared/errors';

import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory';

import { ICarsRepository } from '@modules/cars/repositories';
import { CreateCarUseCase } from '@modules/cars/useCases/createCar';

let createCarUseCase: CreateCarUseCase;
let inMemoryCarsRepository: ICarsRepository;

describe('Create Car', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = {
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    };

    await createCarUseCase.execute(car);

    const findCar = await inMemoryCarsRepository.findByLicensePlate(car.license_plate);

    expect(findCar).toHaveProperty('id');
  });

  it('should not be able to create a car with duplicated license plate', async () => {
    const car = {
      name: 'Name Car 1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    };

    await createCarUseCase.execute(car);

    expect(
      createCarUseCase.execute({ ...car, name: 'Name Car 2' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a car with available true by default ', async () => {
    const car = {
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    };

    await createCarUseCase.execute(car);

    const findCar = await inMemoryCarsRepository.findByLicensePlate(car.license_plate);

    expect(findCar?.available).toBe(true);
  });
});
