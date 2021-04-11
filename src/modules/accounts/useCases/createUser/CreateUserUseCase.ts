import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { IHashProvider } from '@shared/container/providers';

import { User } from '@modules/accounts/entities';
import { IUsersRepository } from '@modules/accounts/repositories';

interface IRequest {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase implements IBaseUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, password, driver_license }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('email_already_registered');
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });

    return user;
  }
}

export { CreateUserUseCase };
