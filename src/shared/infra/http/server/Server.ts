import express, { Express } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from 'swaggerFile';

import { uploadConfig } from '@config/upload';

import { registerDependencies } from '@shared/container';
import { createDbConnection } from '@shared/infra/typeorm';
import { rateLimiter } from '@shared/infra/http/middlewares';

import { router } from '../routes/index.routes';
import { generalErrorHandler } from '../middlewares/generalErrorHandler';

class Server {
  public app: Express;

  constructor() {
    registerDependencies();
    this.app = express();

    this.middlewares();
    this.routes();
    this.errorHandlers();
  }

  private routes() {
    this.app.use(router);
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(rateLimiter);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    this.app.use('/files', express.static(uploadConfig.tmpFolder));
  }

  private errorHandlers() {
    this.app.use(generalErrorHandler);
  }

  public async start() {
    await createDbConnection();

    this.app.listen(3333, () => console.log('Server is Running! 🎉'));
  }
}

export const server = new Server();
