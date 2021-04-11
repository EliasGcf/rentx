import { getRepository, Repository } from 'typeorm';

import { Category } from '@modules/cars/entities';
import { ICategoriesRepository, ICreateCategoryDTO } from '@modules/cars/repositories';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({ name, description });

    await this.ormRepository.save(category);

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
