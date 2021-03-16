import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response): Response {
    const allCategories = this.listCategoriesUseCase.execute();

    return res.json(allCategories);
  }
}

export { ListCategoriesController };
