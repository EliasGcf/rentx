import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { IDateProvider } from '@shared/container/providers';
import { IUsersRepository, IUsersTokensRepository } from '@modules/accounts/repositories';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase implements IBaseUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('incorrect_credentials');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('incorrect_credentials');
    }

    const token = sign({}, authConfig.secret_token, {
      subject: user.id,
      expiresIn: authConfig.expires_in_token,
    });

    const refresh_token = sign({ email: user.email }, authConfig.secret_refresh_token, {
      subject: user.id,
      expiresIn: authConfig.expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      authConfig.expires_in_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
