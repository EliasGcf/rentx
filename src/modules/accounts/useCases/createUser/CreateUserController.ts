import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license } = req.body;

    const createUserUserCase = container.resolve(CreateUserUseCase);

    const user = await createUserUserCase.execute({
      name,
      email,
      password,
      driver_license,
    });

    return res.status(201).json(user);
  }
}

export { CreateUserController };
