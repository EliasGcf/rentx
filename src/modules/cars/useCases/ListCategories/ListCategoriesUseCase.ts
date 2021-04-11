import { inject, injectable } from 'tsyringe';

import { IBaseUseCase } from '@shared/useCases';
import { Category } from '@modules/cars/entities';
import { ICategoriesRepository } from '@modules/cars/repositories';

@injectable()
class ListCategoriesUseCase implements IBaseUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const allCategories = await this.categoriesRepository.list();

    return allCategories;
  }
}

export { ListCategoriesUseCase };
