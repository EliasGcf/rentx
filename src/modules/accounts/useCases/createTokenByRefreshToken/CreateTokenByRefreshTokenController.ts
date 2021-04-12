import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTokenByRefreshTokenUseCase } from './CreateTokenByRefreshTokenUseCase';

class CreateTokenByRefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token = req.body.token || req.headers['x-access-token'] || req.query.token;

    const createTokenByRefreshToken = container.resolve(CreateTokenByRefreshTokenUseCase);

    const refresh_token = await createTokenByRefreshToken.execute({
      refresh_token: token,
    });

    return res.json({ refresh_token });
  }
}

export { CreateTokenByRefreshTokenController };
