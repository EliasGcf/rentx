import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/accounts/repositories';
import { AppError } from '@shared/errors';

async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = req.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user?.isAdmin) {
    throw new AppError("User isn't admin.");
  }

  return next();
}

export { ensureAdmin };
