import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import * as imageRouter from './src/routers/routers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as database from './src/database/database';
import { IError } from './src/TS/interface';
import swaggerDocument from './swagger/swagger.json';

const app = express();

app.use(cors());
app.options('*', cors());

const options = {
  explorer: true,
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use('/images', imageRouter.default);

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status).send(error);
});

// eslint-disable-next-line no-console
app.listen(8080, () => console.log('listening on port 8090'));
