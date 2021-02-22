import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";
import { ExpirationCompleteListener } from "./events/listeners/exipration-complete-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";

const AUTH_PORT = 3000;

const cleanShutdown = () => {
    natsWrapper.client.on('close', () => {
        console.log('NATS connection closed');
        process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
}

const start = async () => {
    try {
        // check env
        if (!process.env.JWT_KEY) {
            throw new Error('JWT_KEY must be defined');
        }
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI must be defined');
        }
        if (!process.env.NATS_CLIENT_ID) {
            throw new Error('NATS_CLIENT_ID must be defined');
        }
        if (!process.env.NATS_URL) {
            throw new Error('NATS_URL must be defined');
        }
        if (!process.env.NATS_CLUSTER_ID) {
            throw new Error('NATS_CLUSTER_ID must be defined');
        }
        await natsWrapper.connect(
          process.env.NATS_CLUSTER_ID,
          process.env.NATS_CLIENT_ID,
          process.env.NATS_URL);

        cleanShutdown();

        new TicketCreatedListener(natsWrapper.client).listen();
        new TicketUpdatedListener(natsWrapper.client).listen();
        new ExpirationCompleteListener(natsWrapper.client).listen();
        new PaymentCreatedListener(natsWrapper.client).listen();

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
