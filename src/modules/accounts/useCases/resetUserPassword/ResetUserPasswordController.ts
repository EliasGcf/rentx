import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '@shared/errors';

import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase';

class ResetUserPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    const { password } = req.body;

    if (Array.isArray(token) || typeof token !== 'string') {
      throw new AppError('password_reset_token_not_format_valid');
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
