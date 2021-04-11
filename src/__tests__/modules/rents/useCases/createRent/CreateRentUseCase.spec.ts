import dayjs from 'dayjs';

import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory';
import { InMemoryRentsRepository } from '@modules/rents/repositories/in-memory';

import { AppError } from '@shared/errors';
import { MIN_RENT_HOURS } from '@shared/constants';
import { DayjsDateProvider, IDateProvider } from '@shared/container/providers';

import { ICarsRepository } from '@modules/cars/repositories';
import { IRentsRepository } from '@modules/rents/repositories';
import { CreateRentUseCase } from '@modules/rents/useCases/createRent';

let createRentUseCase: CreateRentUseCase;
let inMemoryRentsRepository: IRentsRepository;
let inMemoryCarsRepository: ICarsRepository;
let dateProvider: IDateProvider;

describe('Create Rent', () => {
  beforeEach(() => {
    inMemoryRentsRepository = new InMemoryRentsRepository();
    inMemoryCarsRepository = new InMemoryCarsRepository();
    dateProvider = new DayjsDateProvider();
    createRentUseCase = new CreateRentUseCase(
      inMemoryRentsRepository,
      dateProvider,
      inMemoryCarsRepository,
    );
  });

  const dayAfter24h = dayjs().add(1, 'day').toDate();
  const carData = {
    name: 'fake_car_name',
    description: 'fake_car_description',
    daily_rate: 100,
    license_plate: 'fake_license_plate',
    brand: 'fake_brand',
    fine_amount: 120,
    category_id: 'fake_category_id',
  };

  it('should be able to create a new rent', async () => {
    const car = await inMemoryCarsRepository.create(carData);

    const rent = await createRentUseCase.execute({
      user_id: 'fake_user_id',
      car_id: car.id,
      expected_return_date: dayAfter24h,
    });

    expect(rent).toHaveProperty('id');
    expect(rent).toHaveProperty('start_date');
    expect(rent.start_date).toBeInstanceOf(Date);
  });

  it('should not be able to create a new rent when the user already has other rent in progress', async () => {
    const [car1, car2] = await Promise.all([
      inMemoryCarsRepository.create({
        ...carData,
        license_plate: 'fake_license_plate_1',
      }),
      inMemoryCarsRepository.create({
        ...carData,
        license_plate: 'fake_license_plate_2',
      }),
    ]);

    await createRentUseCase.execute({
      user_id: 'fake_user_id_1',
      car_id: car1.id,
      expected_return_date: dayAfter24h,
    });

    expect(
      createRentUseCase.execute({
        user_id: 'fake_user_id_1',
        car_id: car2.id,
        expected_return_date: dayAfter24h,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rent when already has other rent in progress with this car', async () => {
    const car = await inMemoryCarsRepository.create(carData);

    await createRentUseCase.execute({
      user_id: 'fake_user_id_1',
      car_id: car.id,
      expected_return_date: dayAfter24h,
    });

    expect(
      createRentUseCase.execute({
        user_id: 'fake_user_id_2',
        car_id: car.id,
        expected_return_date: dayAfter24h,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to create a new rent if the expected return date is less then ${MIN_RENT_HOURS}h`, async () => {
    const car = await inMemoryCarsRepository.create(carData);

    expect(
      createRentUseCase.execute({
        user_id: 'fake_user_id_2',
        car_id: car.id,
        expected_return_date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
