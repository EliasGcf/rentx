import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const avatar_file = req.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const updatedUser = await updateUserAvatarUseCase.execute({
      user_id: user.id,
      avatar_file,
    });

    return res.status(204).send(updatedUser);
  }
}

export { UpdateUserAvatarController };
