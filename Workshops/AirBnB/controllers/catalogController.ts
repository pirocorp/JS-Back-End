import { Router } from 'express';

import * as accomodationService from '../services/accommodationService';

import { IAccomodationSearchDTO } from '../interfaces/IAccomodationSearchDTO';

const router = Router();

router.get('/', (req, res) => {
    const search = req.query as any as IAccomodationSearchDTO;  
    const rooms = accomodationService.getAll(search);

    const payload = {
        title: 'All accomodations',
        rooms,
        search: search,
    };

    res.render('./catalog/index', payload);
});

export default router;