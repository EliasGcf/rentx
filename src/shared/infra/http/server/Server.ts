import express, { Express } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from 'swaggerFile';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import { uploadConfig } from '@config/upload';
import { sentryConfig } from '@config/sentry';

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

    this.initErrorMonitor();

    this.middlewares();
    this.routes();
    this.errorHandlers();
  }

  private routes() {
    this.app.use(router);
  }

  private middlewares() {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(Sentry.Handlers.tracingHandler());

    this.app.use(express.json());
    this.app.use(rateLimiter);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    this.app.use('/files', express.static(uploadConfig.tmpFolder));
  }

  private initErrorMonitor() {
    Sentry.init({
      dsn: sentryConfig.dsn_url,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app: this.app }),
      ],
      tracesSampleRate: 1.0,
    });
  }

  private errorHandlers() {
    this.app.use(Sentry.Handlers.errorHandler());
    this.app.use(generalErrorHandler);
  }

  public async start() {
    await createDbConnection();

    this.app.listen(3333, () => console.log('Server is Running! 🎉'));
  }
}

export const server = new Server();
