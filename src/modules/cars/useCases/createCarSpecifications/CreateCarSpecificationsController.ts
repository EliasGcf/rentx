import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IBaseController } from '@shared/infra/http/controllers';

import { CreateCarSpecificationsUseCase } from './CreateCarSpecificationsUseCase';

class CreateCarSpecificationsController implements IBaseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecificationsUseCase = container.resolve(
      CreateCarSpecificationsUseCase,
    );

    const car = await createCarSpecificationsUseCase.execute({
      car_id,
      specifications_id,
    });

    return res.status(201).send(car);
  }
}

export { CreateCarSpecificationsController };
