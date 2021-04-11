import { ICreateCarImageDTO } from '../dtos';
import { CarImage } from '../entities';

interface ICarsImagesRepository {
  create(data: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarsImagesRepository };
