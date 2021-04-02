import dayjs from 'dayjs';

import { IRentsRepository } from '@modules/rents/repositories';
import { InMemoryRentsRepository } from '@modules/rents/repositories/in-memory';
import { CreateRentUseCase } from '@modules/rents/useCases/createRent';
import { AppError } from '@shared/errors';
import { MIN_RENT_HOURS } from '@shared/constants';
import { DayjsDateProvider, IDateProvider } from '@shared/container/providers';

let createRentUseCase: CreateRentUseCase;
let inMemoryRentsRepository: IRentsRepository;
let dateProvider: IDateProvider;

describe('Create Rent', () => {
  beforeEach(() => {
    inMemoryRentsRepository = new InMemoryRentsRepository();
    dateProvider = new DayjsDateProvider();
    createRentUseCase = new CreateRentUseCase(inMemoryRentsRepository, dateProvider);
  });

  const dayAfter24h = dayjs().add(1, 'day').toDate();

  it('should be able to create a new rent', async () => {
    const rent = await createRentUseCase.execute({
      user_id: 'fake_user_id',
      car_id: 'fake_car_id',
      expected_return_date: dayAfter24h,
    });

    expect(rent).toHaveProperty('id');
    expect(rent).toHaveProperty('start_date');
    expect(rent.start_date).toBeInstanceOf(Date);
  });

  it('should not be able to create a new rent when the user already has other rent in progress', async () => {
    await createRentUseCase.execute({
      user_id: 'fake_user_id_1',
      car_id: 'fake_car_id_1',
      expected_return_date: dayAfter24h,
    });

    expect(
      createRentUseCase.execute({
        user_id: 'fake_user_id_1',
        car_id: 'fake_car_id_2',
        expected_return_date: dayAfter24h,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rent when already has other rent in progress with this car', async () => {
    await createRentUseCase.execute({
      user_id: 'fake_user_id_1',
      car_id: 'fake_car_id_1',
      expected_return_date: dayAfter24h,
    });

    expect(
      createRentUseCase.execute({
        user_id: 'fake_user_id_2',
        car_id: 'fake_car_id_1',
        expected_return_date: dayAfter24h,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to create a new rent if the expected return date is less then ${MIN_RENT_HOURS}h`, async () => {
    expect(
      createRentUseCase.execute({
        user_id: 'fake_user_id_2',
        car_id: 'fake_car_id_1',
        expected_return_date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
