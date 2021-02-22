import mongoose from 'mongoose';
import { app } from './app';

const AUTH_PORT = 3000;

const start = async () => {
    try {
        // check env
        if (!process.env.JWT_KEY) {
            throw new Error('JWT_KEY must be defined');
        }
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI must be defined');
        }
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("connected to MongoDB");
    } catch (err) {
        console.log(err);
    }

    app.listen(AUTH_PORT, () => {
        console.log(`Listening on port ${AUTH_PORT}!`);
    });
}

start();
