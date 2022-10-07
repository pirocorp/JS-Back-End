export interface IJwtUser {
    username: string;
    roles: string[];
    iat: number | undefined;
};