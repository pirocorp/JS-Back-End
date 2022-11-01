import express from 'express';
import debug from 'debug';
import jwtService from '../services/jwt.service';

const log: debug.IDebugger = debug('app:auth-controller');

class AuthController {
    async createJWT(req: express.Request, res: express.Response) {
        try {
            const userId = req.body.userId
            const data = req.body;
            const { accessToken, refreshToken, refreshKey } = jwtService.createJWT(userId, data);

            req.body.refreshKey = refreshKey;
            
            return res
                .status(201)
                .send({ accessToken, refreshToken });
        } catch (err) {
            log('createJWT error: %O', err);
            return res.status(500).send();
        }
    }
}

export default new AuthController();