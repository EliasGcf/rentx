import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail';
import { ResetUserPasswordController } from '@modules/accounts/useCases/resetUserPassword';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetUserPasswordController.handle);

export { passwordRoutes };
