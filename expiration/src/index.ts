import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

const AUTH_PORT = 3000;


// interestingly, this is better done
// here and not in the natsWrapper file
// because the natsWrapper can exit the
// program.  So we do it here because this
// is more central
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
        if (!process.env.NATS_CLIENT_ID) {
            throw new Error('NATS_CLIENT_ID must be defined');
        }
        if (!process.env.NATS_URL) {
            throw new Error('NATS_URL must be defined');
        }
        if (!process.env.NATS_CLUSTER_ID) {
            throw new Error('NATS_CLUSTER_ID must be defined');
        }
        // natsWrapper does not keep track of connections internally
        // something needs to keep the client, and it needs to be shared
        // but we import things into this file, not the other way;
        // we don't want circular imports
        await natsWrapper.connect(
          process.env.NATS_CLUSTER_ID,
          process.env.NATS_CLIENT_ID,
          process.env.NATS_URL);

        cleanShutdown();

        new OrderCreatedListener(natsWrapper.client).listen();

    } catch (err) {
        console.log(err);
    }

}

start();
