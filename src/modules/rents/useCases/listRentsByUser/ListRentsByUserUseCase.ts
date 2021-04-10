import { inject, injectable } from 'tsyringe';

import { IBaseUseCase } from '@shared/useCases';
import { IRentsRepository } from '@modules/rents/repositories';
import { Rent } from '@modules/rents/infra/typeorm/entities/Rent';

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentsByUserUseCase implements IBaseUseCase {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<Rent[]> {
    const rentsByUser = await this.rentsRepository.findAllByUserId(user_id, {
      relations: ['car'],
    });

    return rentsByUser;
  }
}

export { ListRentsByUserUseCase };
