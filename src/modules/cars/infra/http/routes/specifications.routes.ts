import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.use(ensureAdmin);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
