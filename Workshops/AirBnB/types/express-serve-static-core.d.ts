import { IJwtUser } from './interfaces/IUser';

export declare module 'express-serve-static-core' {
    interface Request {
        user: IJwtUser;
        signJwt: (data: IJwtUser) => string;
    }
};