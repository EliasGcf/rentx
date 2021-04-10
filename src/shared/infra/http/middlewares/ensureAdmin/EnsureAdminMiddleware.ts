import { inject, injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors';
import { IUsersRepository } from '@modules/accounts/repositories';

@injectable()
class EnsureAdminMiddleware {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;

    const user = await this.usersRepository.findById(id);

    if (!user?.isAdmin) {
      throw new AppError('user_is_not_admin');
    }

    return next();
  }
}

export { EnsureAdminMiddleware };
