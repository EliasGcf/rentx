import { Router } from 'express';

import { CreateRentController } from '@modules/rents/useCases/createRent';
import { ensureAuthenticated } from '@shared/infra/http/middlewares';

const rentsRoutes = Router();

const createRentController = new CreateRentController();

rentsRoutes.use(ensureAuthenticated);
rentsRoutes.post('/', createRentController.handle);

export { rentsRoutes };
