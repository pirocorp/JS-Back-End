import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/**
* This value is automatically populated from .env, a file which you will have
* to create for yourself at the root of the project.
*
* See .env.example in the repo for the required format.
*/
const jwtSecret: string = process.env.JWT_SECRET as string;
const tokenExpirationInSeconds = 36000;

class JwtService {
    public createJWT(userId: string, data: any): {
        accessToken: string,
        refreshToken: string,
        refreshKey: Buffer
    }{
        const refreshId = userId + jwtSecret;
        const salt = crypto.createSecretKey(crypto.randomBytes(16));
        const hash = crypto
            .createHmac('sha512', salt)
            .update(refreshId)
            .digest('base64');

        const refreshKey = salt.export();

        const token = jwt.sign(
            data, 
            jwtSecret, {
                expiresIn: tokenExpirationInSeconds,
            }
        );
        
        return {
            accessToken: token,
            refreshToken: hash,
            refreshKey
        };
    }
}

export default new JwtService();