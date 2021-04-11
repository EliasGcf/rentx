import { ICreateCarDTO, IFindAllAvailableDTO } from '../dtos';
import { Car } from '../entities';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAllAvailable(data?: IFindAllAvailableDTO): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  save(car: Car): Promise<void>;
  updateAvailable(id: string, isAvailable: boolean): Promise<void>;
}

export { ICarsRepository };
