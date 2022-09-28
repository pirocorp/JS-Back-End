import { Request, Response, NextFunction } from 'express';

export const defaultTitle = (defaultTitle: string) => (req: Request, res: Response, next: NextFunction) => {
    res.locals.title = defaultTitle;
    next();
};