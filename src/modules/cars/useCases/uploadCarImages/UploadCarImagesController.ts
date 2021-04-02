import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IBaseController } from '@shared/infra/http/controllers';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

class UploadCarImagesController implements IBaseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const { files } = req;

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    let images_name: string[] = [];

    if (Array.isArray(files)) {
      images_name = files.map(file => file.filename);
    }

    await uploadCarImagesUseCase.execute({
      car_id,
      images_name,
    });

    return res.status(201).send();
  }
}

export { UploadCarImagesController };
