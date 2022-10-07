import { Router, Request, Response } from 'express';

import * as authService from '../services/authService';

import { IJwtUser } from '../interfaces/IUser';

const router = Router();

router.get('/login', (req, res) => {
    res.render('./auth/login', {
        title: 'Login'
    });
});

router.post('/login', async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    try {
        const user = await authService.login(username, password);        
        attachToken(req, res, user);
        res.redirect('/');
    } catch(error: any) {
        res.render('./auth/login', {
            title: 'Login Error',
            errors: error.message.split('\n')
        });
    }
});

router.get('/register', (req, res) => {
    res.render('./auth/register', {
        title: 'Register'
    });
});

router.post('/register', async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const repass = req.body.repass.trim();

    try {
        if(username == '' || password == '' || repass == ''){
            throw new Error("All fields are required");            
        }

        if(password != repass){
            throw new Error("Password don't match");            
        }

        const user = await authService.register(username, password);
        attachToken(req, res, user);
        res.redirect('/');
    } catch (error: any) {      
        res.render('./auth/register', {
            title: 'Register Error',
            errors: error.message.split('\n')
        });
    }
});

export default router;

const attachToken = (req: Request, res: Response, user: IJwtUser) => {
    const token = req.signJwt(user);
    res.cookie('jwt', token, { maxAge: 14400000, httpOnly: true });    
};
