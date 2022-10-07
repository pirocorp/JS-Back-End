export interface IJwtUser {
    _id: string;
    username: string;
    roles: string[];
    iat?: number;
}