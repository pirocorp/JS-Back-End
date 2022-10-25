import express from 'express';
import debug from 'debug';

import userService from '../services/users.service';
import mongoose from 'mongoose';

const log: debug.IDebugger = debug('app:users-controller');

class UsersMiddleware {
    public async validateSameEmailDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await userService.getUserByEmail(req.body.email);
        if (user) {
            res.status(400).send({ error: `User email already exists` });
        } else {
            next();
        }
    };

    async validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (res.locals.user._id.toString() === req.params.userId) {
            next();
        } else {
            res.status(400).send({ error: `Invalid email` });
        }
    };    

    // Here we need to use an arrow function to bind `this` correctly
    public validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body.email) {
            log('Validating email', req.body.email);

            this.validateSameEmailBelongToSameUser(req, res, next);
        } else {
            next();
        }
    };

    public async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const userId = req.params.userId;
        const user = await userService.readById(userId);

        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).send({
                error: `User ${userId} not found`,
            });
        }
    };

    public async extractUserId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const userId = req.params.userId;

        if(!mongoose.isValidObjectId(userId)){
            res.status(404).send({
                error: `User ${userId} not found`,
            });

            return;
        }

        req.body.id = userId;
        next();
    };

    public async userCantChangePermission(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (
            'permissionFlags' in req.body &&
            req.body.permissionFlags !== res.locals.user.permissionFlags
        ) {
            res.status(400).send({
                errors: ['User cannot change permission flags'],
            });
        } else {
            next();
        }
    }
};

export default new UsersMiddleware();