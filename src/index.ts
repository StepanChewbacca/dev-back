import express, { NextFunction, Request, Response } from 'express';
import * as imageRouter from './routers/routers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as database from './database/database';
import { IError } from './TS/interface';

const app = express();

app.use('/images', imageRouter.default);

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status).send(error);
});

// eslint-disable-next-line no-console
app.listen(8086, () => console.log('listening on port 8085'));
