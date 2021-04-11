import { AppError } from '@shared/errors';

import { InMemoryCategoriesRepository } from '@modules/cars/repositories/in-memory';

import { ICategoriesRepository } from '@modules/cars/repositories';
import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory';

let createCategoryUseCase: CreateCategoryUseCase;
let inMemoryCategoriesRepository: ICategoriesRepository;

describe('Create Category', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await inMemoryCategoriesRepository.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with duplicated name', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    };

    await createCategoryUseCase.execute(category);

    expect(createCategoryUseCase.execute(category)).rejects.toBeInstanceOf(AppError);
  });
});
