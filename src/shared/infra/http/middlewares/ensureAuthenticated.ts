import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors';
import { authConfig } from '@config/auth';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories';

interface ITokenPayload {
  sub: string;
}

async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      authConfig.secret_refresh_token,
    ) as ITokenPayload;

    // const usersRepository = new UsersRepository();

    // const user = await usersRepository.findById(user_id);

    const user = await usersTokensRepository.findByUserIdAndRefreshToken({
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

export { ensureAuthenticated };
