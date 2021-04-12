import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors';
import { authConfig } from '@config/auth';
import { IBaseUseCase } from '@shared/useCases';
import { IDateProvider, IJWTProvider } from '@shared/container/providers';
import { IUsersTokensRepository } from '@modules/accounts/repositories';

interface IRequest {
  refresh_token: string;
}

interface IResponse {
  refresh_token: string;
  token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class CreateTokenByRefreshTokenUseCase implements IBaseUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('JWTProvider')
    private jwtProvider: IJWTProvider,
  ) {}

  async execute({ refresh_token }: IRequest): Promise<IResponse> {
    const { email, sub: user_id } = this.jwtProvider.decodeToken<IPayload>(
      refresh_token,
      authConfig.refreshJwt.secret,
    );

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken({
      user_id,
      refresh_token,
    });

    if (!userToken) {
      throw new AppError('missing_auth_token');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const token = this.jwtProvider.generateToken(authConfig.jwt.secret, {
      subject: user_id,
      expiresIn: authConfig.jwt.expires_in,
    });

    const new_refresh_token = this.jwtProvider.generateToken(
      authConfig.refreshJwt.secret,
      {
        payload: { email },
        subject: user_id,
        expiresIn: authConfig.refreshJwt.expires_in,
      },
    );

    const refresh_token_expires_date = this.dateProvider.addDays(
      authConfig.refreshJwt.expires_in_days,
    );

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: new_refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return {
      token,
      refresh_token: new_refresh_token,
    };
  }
}

export { CreateTokenByRefreshTokenUseCase };
