import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    // empty the cookie (dump the JWT)
    req.session = null;

    res.send({});
});

export { router as signoutRouter };
