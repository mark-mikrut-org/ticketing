import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken'; // has sign method

import { app } from "../app";

declare global {
    namespace NodeJS {
        interface Global {
            signin(id?: string): string[]
        }
    }
}

jest.mock('../nats-wrapper');


let mongo: any;

process.env.STRIPE_KEY='sk_test_sYnijgIp2XhxtoLq8oPBFWa8';

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
    });
});

beforeEach(async () => {
    jest.clearAllMocks(); // this keeps test mocks from interfering across test cases
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})

global.signin = (id?: string) => {
    // build a JWT payload.  { id, email }
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };

    // create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // build up the session object { jwt: theJWT }
    const session = { jwt: token };

    // turn session into JSON
    const sessionJSON = JSON.stringify(session);

    // encode JSON as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string that is the cookie with the encoded data
    return [`express:sess=${base64}`];
};