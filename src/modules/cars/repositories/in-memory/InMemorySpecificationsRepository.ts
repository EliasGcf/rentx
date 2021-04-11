import { Specification } from '@modules/cars/entities';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class InMemorySpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(specification => specification.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(specification => ids.includes(specification.id));
  }
}

export { InMemorySpecificationsRepository };
