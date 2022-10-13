import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../common/ErrorHandler';

export const errorHandlingMiddleware = () => async (err: Error, req: Request, res: Response, next: NextFunction) => {   
    if (!errorHandler.isTrustedError(err)) {
        next(err);
    }

    await errorHandler.handleError(err);
};