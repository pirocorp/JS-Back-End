import { Request, Response, NextFunction } from 'express';
import { IJwtUser } from '../interfaces/IUser';

export const hasUser = () => (req: Request, res: Response, next: NextFunction): void => {
    if(req.user != undefined) {
        next();
        return;
    } 
    
    res.redirect('/auth/login');
};

export const isGuest = () => (req: Request, res: Response, next: NextFunction): void => {
    if(req.user != undefined) {
        res.redirect('/');
        return;
    } 
    
    next();
};

export const hasRole = (role: string) => (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as IJwtUser

    if(user == undefined || !user.roles.includes(role)) {
        res.redirect('/auth/login');
        return;
    }

    next();
};