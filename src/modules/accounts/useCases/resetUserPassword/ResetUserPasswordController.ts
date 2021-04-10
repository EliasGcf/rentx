import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '@shared/errors';

import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase';

class ResetUserPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    const { password } = req.body;

    if (Array.isArray(token) || typeof token !== 'string') {
      throw new AppError('Token must be a string.');
    }

    const resetUserPasswordUseCase = container.resolve(ResetUserPasswordUseCase);

    await resetUserPasswordUseCase.execute({
      token,
      password,
    });

    return res.status(204).send();
  }
}

export { ResetUserPasswordController };
