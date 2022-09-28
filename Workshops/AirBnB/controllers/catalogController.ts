import { Router } from 'express';

import * as accomodationService from '../services/accommodationService';

const router = Router();

router.get('/', (req, res) => {
    const rooms = accomodationService.getAll();

    const payload = {
        title: 'All accomodations',
        rooms,
    };

    res.render('./catalog/index', payload);
});

export default router;