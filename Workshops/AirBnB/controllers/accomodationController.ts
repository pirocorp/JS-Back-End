import { Router } from 'express';

import * as accomodationService from '../services/accomodationService';

const router = Router();

router.get('/create', (req, res) => {
    const payload = {
        title: 'Accomodation Form'
    }

    res.render('./accomodation/create', payload);
});

router.post('/create', (req, res) => {

    res.redirect('/catalog');
});

router.get('/:id', (req, res) => {
    const roomId = req.params.id;
    const room = accomodationService.getById(roomId);

    const payload = {
        title: 'Accomodation Details',
        room,
        roomId,
    }

    if(room){
        res.render('./accomodation/details', payload);
    }else{
        res.render('./accomodation/roomNotFound', payload)
    }    
});

export default router;