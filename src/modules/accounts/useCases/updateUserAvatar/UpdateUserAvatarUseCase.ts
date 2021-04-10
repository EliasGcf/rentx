import { inject, injectable } from 'tsyringe';

import { deleteFile } from '@utils/file';
import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { IUsersRepository } from '@modules/accounts/repositories';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase implements IBaseUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user_is_not_registered');
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarUseCase };
