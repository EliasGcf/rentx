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
      throw new AppError('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const { sub: user_id } = verify(
        token,
        authConfig.secret_refresh_token,
      ) as ITokenPayload;

      const user = await this.usersTokensRepository.findByUserIdAndRefreshToken({
        user_id,
        refresh_token: token,
      });

      if (!user) {
        throw new AppError('User does not exists', 401);
      }

      req.user = {
        id: user_id,
      };

      return next();
    } catch {
      throw new AppError('Invalid Token', 401);
    }
  }
}

export { EnsureAuthenticatedMiddleware };
