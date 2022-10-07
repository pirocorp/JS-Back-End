import { Router } from 'express';
import * as authService from '../services/authService';

const router = Router();

router.get('/login', (req, res) => {
    res.render('./auth/login', {
        title: 'Login'
    });
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        const result = await authService.login(username, password);
        const token = req.signJwt(result);
        
        res.cookie('jwt', token);
        res.redirect('/');        
    } catch(error: any) {
        const errors = [error.message];
        
        res.render('./auth/login', {
            title: 'Request Error',
            errors
        });
    }
});

export default router;
