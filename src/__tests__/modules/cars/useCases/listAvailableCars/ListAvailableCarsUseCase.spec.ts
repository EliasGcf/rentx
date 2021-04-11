import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory';

import { ICarsRepository } from '@modules/cars/repositories';
import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars';

let inMemoryCarsRepository: ICarsRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List available Cars', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(inMemoryCarsRepository);
  });

  it('should be able to list all available cars', async () => {
    await inMemoryCarsRepository.create({
      name: 'Car1',
      description: 'Car1 Description',
      daily_rate: 100,
      license_plate: 'ABC-1111',
      fine_amount: 10,
      brand: 'Car1 brand',
      category_id: 'fake_category_id',
    });

    const cars = await listAvailableCarsUseCase.execute();

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars by brand', async () => {
    await inMemoryCarsRepository.create({
      name: 'Car1',
      description: 'Car1 Description',
      daily_rate: 100,
      license_plate: 'ABC-1111',
      fine_amount: 10,
      brand: 'Car1 brand',
      category_id: 'fake_category_id',
    });

    await inMemoryCarsRepository.create({
      name: 'Car2',
      description: 'Car2 Description',
      daily_rate: 100,
      license_plate: 'ABC-1112',
      fine_amount: 10,
      brand: 'Car2 brand',
      category_id: 'fake_category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: 'Car2 brand' });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars by name', async () => {
    await inMemoryCarsRepository.create({
      name: 'Car1',
      description: 'Car1 Description',
      daily_rate: 100,
      license_plate: 'ABC-1111',
      fine_amount: 10,
      brand: 'Car1 brand',
      category_id: 'fake_category_id',
    });

    await inMemoryCarsRepository.create({
      name: 'Car2',
      description: 'Car2 Description',
      daily_rate: 100,
      license_plate: 'ABC-1112',
      fine_amount: 10,
      brand: 'Car2 brand',
      category_id: 'fake_category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'Car1' });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars by category_id', async () => {
    await inMemoryCarsRepository.create({
      name: 'Car1',
      description: 'Car1 Description',
      daily_rate: 100,
      license_plate: 'ABC-1111',
      fine_amount: 10,
      brand: 'Car1 brand',
      category_id: 'fake_category_id',
    });

    await inMemoryCarsRepository.create({
      name: 'Car2',
      description: 'Car2 Description',
      daily_rate: 100,
      license_plate: 'ABC-1112',
      fine_amount: 10,
      brand: 'Car2 brand',
      category_id: 'fake_category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'fake_category_id',
    });

    expect(cars).toHaveLength(2);
  });
});
