import { ICreateRentDTO } from '../dtos/ICreateRentDTO';
import { Rent } from '../infra/typeorm/entities/Rent';

interface IRentsRepository {
  create(data: ICreateRentDTO): Promise<Rent>;
  findOpenRentByCarId(car_id: string): Promise<Rent | undefined>;
  findOpenRentByUserId(user_id: string): Promise<Rent | undefined>;
}

export { IRentsRepository };
