import { inject, injectable } from 'tsyringe';

import { IBaseUseCase } from '@shared/useCases/IBaseUseCase';
import { ICarsImagesRepository } from '@modules/cars/repositories';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase implements IBaseUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.forEach(async image_name => {
      await this.carsImagesRepository.create({ car_id, image_name });
    });
  }
}

export { UploadCarImagesUseCase };
