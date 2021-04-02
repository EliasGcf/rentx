import { Request, Response } from 'express';

interface IBaseController {
  handle(req: Request, res: Response): Promise<Response>;
}

export { IBaseController };
