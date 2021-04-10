import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentsByUserUseCase } from './ListRentsByUserUseCase';

class ListRentsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const listRentsByUserUseCase = container.resolve(ListRentsByUserUseCase);

    const rents = await listRentsByUserUseCase.execute({ user_id });

    return res.json(rents);
  }
}

export { ListRentsByUserController };
