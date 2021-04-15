import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';

import { User } from '@modules/accounts/entities';
import { IUsersRepository } from '@modules/accounts/repositories';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowUserProfileUseCase implements IBaseUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user_is_not_registered', 'BAD_REQUEST');
    }

    return user;
  }
}

export { ShowUserProfileUseCase };
