import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('./home/index');
});

router.get('/about', (req, res) => {
    res.render('./home/about');
})

export default router;