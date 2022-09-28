import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('./home/index');
});

router.get('/about', (req, res) => {
    const payload = {
        title: 'About Us'
    };

    res.render('./home/about', payload);
});

export default router;