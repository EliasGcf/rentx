import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { Specification } from '@modules/cars/entities';
import { ISpecificationsRepository } from '@modules/cars/repositories';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase implements IBaseUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(
      name,
    );

    if (specificationAlreadyExists) {
      throw new AppError('specification_already_registered');
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
