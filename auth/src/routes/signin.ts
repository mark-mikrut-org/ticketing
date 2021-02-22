import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from "jsonwebtoken";

import { Password } from "../services/password";
import { User } from "../models/user";
import { validateRequest, BadRequestError } from "@my58tickets/common";

const router = express.Router();

router.post('/api/users/signin', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid credentials');
    }

        // generate jwt and save on session object
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email
            },
            process.env.JWT_KEY! // the exclamation tells Typescript we know about this
        );

        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser); // 201 means record created

    });

export { router as signinRouter };
