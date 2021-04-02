import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, brand, category_id } = req.query;

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);

    const availableCars = await listAvailableCarsUseCase.execute({
      name: name?.toString(),
      brand: brand?.toString(),
      category_id: category_id?.toString(),
    });

    return res.json(availableCars);
  }
}

export { ListAvailableCarsController };
