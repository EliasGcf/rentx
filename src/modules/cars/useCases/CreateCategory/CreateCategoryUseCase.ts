import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { Category } from '@modules/cars/entities';
import { ICategoriesRepository } from '@modules/cars/repositories';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase implements IBaseUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError('category_already_registered');
    }

    const category = await this.categoriesRepository.create({ name, description });

    return category;
  }
}

export { CreateCategoryUseCase };
