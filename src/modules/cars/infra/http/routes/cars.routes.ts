import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import { uploadConfig } from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar';
import { ensureAuthenticated, ensureAdmin } from '@shared/infra/http/middlewares';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars';
import { CreateCarSpecificationsController } from '@modules/cars/useCases/createCarSpecifications';

const carsRoutes = Router();

const createCarController = container.resolve(CreateCarController);
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImage = multer(uploadConfig);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.use(ensureAuthenticated);
carsRoutes.use(ensureAdmin);

carsRoutes.post('/', createCarController.handle);
carsRoutes.post('/specifications/:id', createCarSpecificationsController.handle);
carsRoutes.post(
  '/images/:id',
  uploadCarImage.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
