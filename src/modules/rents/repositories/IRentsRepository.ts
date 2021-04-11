import { ICreateRentDTO, IFindAllByUserIdOptionsDTO } from '../dtos';
import { Rent } from '../entities';

interface IRentsRepository {
  create(data: ICreateRentDTO): Promise<Rent>;
  findOpenRentByCarId(car_id: string): Promise<Rent | undefined>;
  findOpenRentByUserId(user_id: string): Promise<Rent | undefined>;
  findById(id: string): Promise<Rent | undefined>;
  save(rent: Rent): Promise<void>;
  findAllByUserId(user_id: string, options?: IFindAllByUserIdOptionsDTO): Promise<Rent[]>;
}

export { IRentsRepository };
