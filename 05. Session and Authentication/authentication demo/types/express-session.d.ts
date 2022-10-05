import { IUserSession } from "../interfaces/IUserSession";

export declare module 'express-session' {
    interface SessionData {
        user: IUserSession;
    }
};