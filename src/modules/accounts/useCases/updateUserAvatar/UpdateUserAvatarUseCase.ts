import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { User } from '@modules/accounts/entities';
import { IStorageProvider } from '@shared/container/providers';
import { IUsersRepository } from '@modules/accounts/repositories';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase implements IBaseUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user_is_not_registered');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar, 'avatar');
    }

    await this.storageProvider.moveFile(avatar_file, 'avatar');

    user.avatar = avatar_file;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarUseCase };
