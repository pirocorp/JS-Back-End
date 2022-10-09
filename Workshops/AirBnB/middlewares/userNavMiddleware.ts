import { Request, Response, NextFunction } from 'express';

export const userNav = () => (req: Request, res: Response, next: NextFunction) => {
    res.locals.hasUser = req.user != undefined;
    res.locals.username = req.user?.username;

    next();
};