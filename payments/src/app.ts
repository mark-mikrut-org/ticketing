import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@my58tickets/common';
import { createChargeRouter } from "./routes/new";


const app = express();
app.set('trust proxy', true); // since https and proxied, need this so that express allows it
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'   // we'll need https! UNLESS we are in env test
    })
);

app.use(currentUser);  // must be after cookieSession which sets currentUser

app.use(createChargeRouter);

app.all('*', async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };

