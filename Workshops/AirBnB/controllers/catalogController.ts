import { Router } from 'express';

import * as roomService from '../services/roomService';

import { IAccomodationSearchDTO } from '../interfaces/IAccomodationSearchDTO';

const router = Router();

router.get('/', async (req, res) => {
    const search = req.query as any as IAccomodationSearchDTO;  
    const rooms = await roomService.getAll(search);

    const payload = {
        title: 'All accomodations',
        rooms,
        search: search,
    };

    res.render('./catalog/index', payload);
});

export default router;