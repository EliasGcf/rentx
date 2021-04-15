import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateUserController } from '@modules/accounts/useCases/createUser';
import { ShowUserProfileController } from '@modules/accounts/useCases/showUserProfile';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const showUserProfileController = new ShowUserProfileController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.use(ensureAuthenticated);

usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

usersRoutes.get('/profile', showUserProfileController.handle);

export { usersRoutes };
