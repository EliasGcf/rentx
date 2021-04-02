import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors';

async function generalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
}

export { generalErrorHandler };
