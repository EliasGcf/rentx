import { Category } from '@modules/cars/entities';

import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class InMemoryCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
}

export { InMemoryCategoriesRepository };
