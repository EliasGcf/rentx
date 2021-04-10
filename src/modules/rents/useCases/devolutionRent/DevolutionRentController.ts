import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentUseCase } from './DevolutionRentUseCase';

class DevolutionRentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id: rent_id } = req.params;

    const devolutionRentUseCase = container.resolve(DevolutionRentUseCase);

    const rent = await devolutionRentUseCase.execute({
      user_id,
      rent_id,
    });

    return res.status(200).json(rent);
  }
}

export { DevolutionRentController };
