import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser';
import { CreateRefreshTokenController } from '@modules/accounts/useCases/createRefreshToken';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const createRefreshTokenController = new CreateRefreshTokenController();

authenticateRoutes.post('/', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', createRefreshTokenController.handle);

export { authenticateRoutes };
