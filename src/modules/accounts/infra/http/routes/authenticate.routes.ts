import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser';
import { CreateTokenByRefreshTokenController } from '@modules/accounts/useCases/createTokenByRefreshToken';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const createTokenByRefreshTokenController = new CreateTokenByRefreshTokenController();

authenticateRoutes.post('/', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', createTokenByRefreshTokenController.handle);

export { authenticateRoutes };
