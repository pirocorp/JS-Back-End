import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { IJwtUser } from '../interfaces/IUser';

export const authentication = (jwtSecret: string) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if(token) {
        try{
            const data = jwt.verify(token, jwtSecret);
            req.user = data;
        } catch(error) {
            res.clearCookie('jwt');
            return res.redirect('/auth/login');
        }
    }

    req.signJwt = (data: IJwtUser) => jwt.sign(data, jwtSecret, {
        expiresIn: '4h'
    });
    
    next();
};