import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors';
import { IBaseUseCase } from '@shared/useCases';
import { IDateProvider, IHashProvider, IJWTProvider } from '@shared/container/providers';
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

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('JWTProvider')
    private jwtProvider: IJWTProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('incorrect_credentials');
    }

    const passwordMatch = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatch) {
      throw new AppError('incorrect_credentials');
    }

    const token = this.jwtProvider.generateToken(authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expires_in,
    });

    const refresh_token = this.jwtProvider.generateToken(authConfig.refreshJwt.secret, {
      payload: { email: user.email },
      subject: user.id,
      expiresIn: authConfig.refreshJwt.expires_in,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      authConfig.refreshJwt.expires_in_days,
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
