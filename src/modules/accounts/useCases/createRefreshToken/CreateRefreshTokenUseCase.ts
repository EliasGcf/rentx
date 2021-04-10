import { inject, injectable } from 'tsyringe';
import { sign, verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors';
import { authConfig } from '@config/auth';
import { IBaseUseCase } from '@shared/useCases';
import { IDateProvider } from '@shared/container/providers';
import { IUsersTokensRepository } from '@modules/accounts/repositories';

interface IRequest {
  refresh_token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class CreateRefreshTokenUseCase implements IBaseUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ refresh_token }: IRequest): Promise<string> {
    const { email, sub: user_id } = verify(
      refresh_token,
      authConfig.refreshJwt.secret,
    ) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken({
      user_id,
      refresh_token,
    });

    if (!userToken) {
      throw new AppError('missing_auth_token');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const new_refresh_token = sign({ email }, authConfig.refreshJwt.secret, {
      subject: user_id,
      expiresIn: authConfig.refreshJwt.expires_in,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      authConfig.refreshJwt.expires_in_days,
    );

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: new_refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return new_refresh_token;
  }
}

export { CreateRefreshTokenUseCase };
