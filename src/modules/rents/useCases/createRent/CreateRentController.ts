import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IBaseController } from '@shared/infra/http/controllers';

import { CreateRentUseCase } from './CreateRentUseCase';

class CreateRentController implements IBaseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, expected_return_date } = req.body;
    const { id: user_id } = req.user;

    const createRentUseCase = container.resolve(CreateRentUseCase);

    const rent = await createRentUseCase.execute({
      user_id,
      car_id,
      expected_return_date,
    });

    return res.status(201).json(rent);
  }
}

export { CreateRentController };
