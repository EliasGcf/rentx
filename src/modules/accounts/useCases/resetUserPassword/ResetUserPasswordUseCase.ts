import { inject, injectable } from 'tsyringe';

import { IBaseUseCase } from '@shared/useCases';
import { IUsersRepository, IUsersTokensRepository } from '@modules/accounts/repositories';
import { AppError } from '@shared/errors';
import { IDateProvider, IHashProvider } from '@shared/container/providers';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPasswordUseCase implements IBaseUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError('invalid_token');
    }

    const TOKEN_EXPIRES_DATE_IS_BEFORE_DATE_NOW = this.dateProvider.isBefore(
      this.dateProvider.dateNow(),
      userToken.expires_date,
    );

    if (TOKEN_EXPIRES_DATE_IS_BEFORE_DATE_NOW) {
      throw new AppError('expired_token');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('user_is_not_registered');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetUserPasswordUseCase };
