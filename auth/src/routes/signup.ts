import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { validateRequest, BadRequestError } from '@my58tickets/common';

const router = express.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be 4 to 20 characters long')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        // does user exist?
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        // new user create and save in DB
        const user = User.build({email, password});
        await user.save();

        // generate jwt and save on session object
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_KEY! // the exclamation tells Typescript we know about this
        );

        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user); // 201 means record created
    }
);

export { router as signupRouter };
