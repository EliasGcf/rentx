import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories';

import { IBaseUseCase } from '@shared/useCases/IBaseUseCase';
import { IStorageProvider } from '@shared/container/providers';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase implements IBaseUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.forEach(async image_name => {
      await this.carsImagesRepository.create({ car_id, image_name });
      await this.storageProvider.moveFile(image_name, 'cars');
    });
  }
}

export { UploadCarImagesUseCase };
