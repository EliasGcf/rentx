import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors';
import { authConfig } from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories';

interface ITokenPayload {
  sub: string;
}

@injectable()
class EnsureAuthenticatedMiddleware {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError('missing_auth_token', 'UNAUTHORIZED');
    }

    const [, token] = authHeader.split(' ');

    try {
      const { sub: user_id } = verify(
        token,
        authConfig.refreshJwt.secret,
      ) as ITokenPayload;

      const user = await this.usersTokensRepository.findByUserIdAndRefreshToken({
        user_id,
        refresh_token: token,
      });

      if (!user) {
        throw new AppError('user_is_not_registered', 'UNAUTHORIZED');
      }

      req.user = {
        id: user_id,
      };

      return next();
    } catch {
      throw new AppError('invalid_token', 'UNAUTHORIZED');
    }
  }
}

export { EnsureAuthenticatedMiddleware };
