import { Router } from 'express';

import { carsRoutes } from '@modules/cars/infra/http/routes/cars.routes';
import { usersRoutes } from '@modules/accounts/infra/http/routes/users.routes';
import { categoriesRoutes } from '@modules/cars/infra/http/routes/categories.routes';
import { specificationsRoutes } from '@modules/cars/infra/http/routes/specifications.routes';
import { authenticateRoutes } from '@modules/accounts/infra/http/routes/authenticate.routes';
import { rentsRoutes } from '@modules/rents/infra/http/routes/rents.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRoutes);
router.use('/sessions', authenticateRoutes);
router.use('/rents', rentsRoutes);

export { router };
