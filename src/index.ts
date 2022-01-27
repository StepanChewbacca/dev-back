const express = require('express');
import {NextFunction, Request, Response} from 'express';
require('./database/database');
const httpConstants = require('http2').constants;

import imageRouter from "./routers/routers";


const app = express()

app.use ('/images', imageRouter);

app.use((error: Error, req:Request, res:Response) => {
    res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(error.message)
})



app.listen(8080, () => console.log("listening on port 8080"))
