import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserMap } from '@modules/accounts/mappers';

import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';

class ShowUserProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const showUserProfileUseCase = container.resolve(ShowUserProfileUseCase);

    const user = await showUserProfileUseCase.execute({ user_id });

    return res.json(UserMap.toDTO(user));
  }
}

export { ShowUserProfileController };
