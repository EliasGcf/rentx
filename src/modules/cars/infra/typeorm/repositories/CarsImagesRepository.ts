import { getRepository, Repository } from 'typeorm';

import { CarImage } from '@modules/cars/entities';
import { ICreateCarImageDTO } from '@modules/cars/dtos';
import { ICarsImagesRepository } from '@modules/cars/repositories';

class CarsImagesRepository implements ICarsImagesRepository {
  private ormRepository: Repository<CarImage>;

  constructor() {
    this.ormRepository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.ormRepository.create({ car_id, image_name });

    await this.ormRepository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
