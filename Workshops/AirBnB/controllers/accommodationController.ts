import { Router } from 'express';
import { ICreateRoomDTO } from '../interfaces/IRoom';

import * as accommodationService from '../services/accommodationService';

const router = Router();

router.get('/create', (req, res) => {
    const payload = {
        title: 'Host New Accomodation'
    }

    res.render('./accommodation/create', payload);
});

router.post('/create', async (req, res) => {

    const roomData = req.body as ICreateRoomDTO;

    try {
        const result = await accommodationService.create(roomData);
        res.redirect(`/accommodation/${result.id}`);
    } catch (err: any) {
        res.render('./accommodation/create', {
            title: 'Request Error',
            error: err.message.split('\n')
        });
    }   
});

router.get('/:id', (req, res) => {
    const roomId = req.params.id;
    const room = accommodationService.getById(roomId);

    const payload = {
        title: 'Accomodation Details',
        room,
        roomId,
    };

    if(room){
        res.render('./accommodation/details', payload);
    }else{
        res.render('./accommodation/roomNotFound', payload)
    }    
});

export default router;