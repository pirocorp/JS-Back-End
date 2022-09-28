import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const payload = {
        title: 'All accomodation'
    }

    res.render('./catalog/index', payload);
});

export default router;