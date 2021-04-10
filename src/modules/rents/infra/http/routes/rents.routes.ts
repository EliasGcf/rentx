import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares';

import { CreateRentController } from '@modules/rents/useCases/createRent';
import { DevolutionRentController } from '@modules/rents/useCases/devolutionRent';
import { ListRentsByUserController } from '@modules/rents/useCases/listRentsByUser';

const rentsRoutes = Router();

const createRentController = new CreateRentController();
const devolutionRentController = new DevolutionRentController();
const listRentsByUserController = new ListRentsByUserController();

rentsRoutes.use(ensureAuthenticated);
rentsRoutes.post('/', createRentController.handle);
rentsRoutes.post('/devolution/:id', devolutionRentController.handle);
rentsRoutes.get('/user', listRentsByUserController.handle);

export { rentsRoutes };
