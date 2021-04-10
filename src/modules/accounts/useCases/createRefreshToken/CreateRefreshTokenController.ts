import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRefreshTokenUseCase } from './CreateRefreshTokenUseCase';

class CreateRefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token = req.body.token || req.headers['x-access-token'] || req.query.token;

    const createRefreshTokenUseCase = container.resolve(CreateRefreshTokenUseCase);

    const refresh_token = await createRefreshTokenUseCase.execute({
      refresh_token: token,
    });

    return res.json({ refresh_token });
  }
}

export { CreateRefreshTokenController };
