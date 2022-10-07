import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import { IJwtUser } from './interfaces/IJwtUser';

const jwtSecret = 'V3ry Hard To gu3$$ $3cR3t!';

const app = express();
app.use(cookieParser());

// Jwt middleware
app.use((req, res, next) => {
    const token = req.cookies.token;

    if(token) {
        try {
            const data = jwt.verify(token, jwtSecret) as jwt.JwtPayload;          

            const user: IJwtUser = {
                username: data['username'],
                roles: data['roles'],
                iat: data.iat
            };

            req.user = user;
        } catch (error) {
            res.clearCookie('token');
        }
    }

    next();
});

app.get('/', (req, res) => {
    if(req.user){
        res.send(`Hello ${req.user.username}`)
    }else{
        res.send('Hello guest');
    }  
});

app.get('/jwt', (req, res) => {
    const payload = {
        username: 'Peter',
        roles: ['user', 'admin']
    };

    const token = jwt.sign(payload, jwtSecret);
    res.cookie('token', token);
    res.send('Token Send');
});

app.listen(3000);