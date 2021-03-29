import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as http from 'http';
import {
  userErrorHandler,
  serverErrorHandler,
  unknownErrorHandler,
} from './utils/errors/errorHandler';
import { config } from './config';
import { AppRouter } from './router';

export class Server {
  public app: express.Application;

  private server: http.Server;

  private static serverInstance: Server;

  public static startServer(): Server {
    if (!this.serverInstance) {
      this.serverInstance = new Server();
      return this.serverInstance;
    }
    return this.serverInstance;
  }

  public close() {
    this.server.close();
  }

  private constructor() {
    this.app = express();
    this.configurationMiddleware();
    this.app.use(AppRouter);
    this.initializeErrorHandler();
    this.server = this.app.listen(config.server.port, () => {
      console.log(
        `${config.server.name} listening on port ${config.server.port}`,
      );
    });
  }

  private setHeaders = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, X-Requested-With, Content-Type',
    );
    next();
  };

  private configurationMiddleware() {
    this.app.use(helmet());
    this.app.use(this.setHeaders);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeErrorHandler() {
    this.app.use(userErrorHandler);
    this.app.use(serverErrorHandler);
    this.app.use(unknownErrorHandler);
  }
}
