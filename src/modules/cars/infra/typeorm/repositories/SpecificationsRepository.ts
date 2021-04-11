import { getRepository, Repository } from 'typeorm';

import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '@modules/cars/repositories';
import { Specification } from '@modules/cars/entities';

class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.ormRepository.create({ name, description });

    await this.ormRepository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.ormRepository.findOne({ name });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.ormRepository.findByIds(ids);

    return specifications;
  }
}

export { SpecificationsRepository };
