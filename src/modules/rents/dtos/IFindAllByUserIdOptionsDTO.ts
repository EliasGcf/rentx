import { RentRelations } from '../infra/typeorm/entities/Rent';

interface IFindAllByUserIdOptionsDTO {
  relations?: RentRelations;
}

export { IFindAllByUserIdOptionsDTO };
