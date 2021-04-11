import { AppError } from '@shared/errors';

import {
  InMemoryCarsRepository,
  InMemorySpecificationsRepository,
} from '@modules/cars/repositories/in-memory';

import { ICarsRepository, ISpecificationsRepository } from '@modules/cars/repositories';
import { CreateCarSpecificationsUseCase } from '@modules/cars/useCases/createCarSpecifications';

let inMemoryCarsRepository: ICarsRepository;
let inMemorySpecificationsRepository: ISpecificationsRepository;

let createCarSpecificationUseCase: CreateCarSpecificationsUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository();

    createCarSpecificationUseCase = new CreateCarSpecificationsUseCase(
      inMemoryCarsRepository,
      inMemorySpecificationsRepository,
    );
  });

  it('should be able to create a new specification for one car', async () => {
    const car = {
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    };

    const specification = {
      name: 'Name Specification',
      description: 'Description Specification',
    };

    const createdSpecification = await inMemorySpecificationsRepository.create(
      specification,
    );

    const createdCar = await inMemoryCarsRepository.create(car);

    await createCarSpecificationUseCase.execute({
      car_id: createdCar.id,
      specifications_id: [createdSpecification.id],
    });

    expect(createdCar).toHaveProperty('specifications');
    expect(createdCar.specifications).toHaveLength(1);
  });

  it('should not be able to create a new specification for a non-existent car', async () => {
    const fake_car_id = 'fake_car_id';
    const fake_specifications_id = ['fake_specifications_id'];

    expect(
      createCarSpecificationUseCase.execute({
        car_id: fake_car_id,
        specifications_id: fake_specifications_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
