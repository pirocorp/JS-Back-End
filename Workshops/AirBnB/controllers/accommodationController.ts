import { Router } from 'express';
import { CreateRoomFormModel } from '../models/Rooms/CreateRoomFormModel';

import * as accommodationService from '../services/accommodationService';

const router = Router();

router.get('/create', (req, res) => {
    const payload = {
        title: 'Accomodation Form'
    }

    res.render('./accommodation/create', payload);
});

router.post('/create', async (req, res) => {

    const roomData = req.body as CreateRoomFormModel;

    try {
        const result = await accommodationService.create(roomData);
        res.redirect(`/accommodation/${result.id}`);
    } catch (error) {
        res.render('create', {
            title: 'Request Error',
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