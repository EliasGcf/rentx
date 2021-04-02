import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories';
import { AppError } from '@shared/errors';

interface ITokenPayload {
  sub: string;
}

async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '9970383976148455904e2332d57720bc',
    ) as ITokenPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    req.user = {
      id: user_id,
    };

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    return next();
  } catch {
    throw new AppError('Invalid Token', 401);
  }
}

export { ensureAuthenticated };
