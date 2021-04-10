import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { EnsureAdminMiddleware } from './EnsureAdminMiddleware';

async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const ensureAdminMiddleware = container.resolve(EnsureAdminMiddleware);

  await ensureAdminMiddleware.handle(req, res, next);
}

export { ensureAdmin };
