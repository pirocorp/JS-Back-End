import express from 'express';
import { body } from 'express-validator'

import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';

import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware'

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    };

    public configureRoutes(): express.Application {
        this.app.route(`/users`)
            .get(UsersController.listUsers)
            .post(
                body('email').isEmail(),
                body('password')
                   .isLength({ min: 5 })
                   .withMessage('Must include password (5+ characters)'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser
            );

        this.app.param(`userId`, UsersMiddleware.extractUserId);
        
        // At the .all() function, we are passing our validateUserExists function 
        // from UsersMiddleware to be called before any GET, PUT, PATCH, or DELETE 
        // can go through on the endpoint /users/:userId. This means validateUserExists 
        // doesn’t need to be in the additional function arrays we pass to .put() 
        // or .patch() — it will get called before the functions specified there.
        this.app.route(`/users/:userId`)
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`/users/:userId`, [
            body('email').isEmail(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersController.put,
        ]);
        
        this.app.patch(`/users/:userId`, [
            body('email').isEmail().optional(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Password must be 5+ characters')
                .optional(),
            body('firstName').isString().optional(),
            body('lastName').isString().optional(),
            body('permissionFlags').isInt().optional(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validatePatchEmail,
            UsersController.patch,
        ]);

        return this.app;
    };
};