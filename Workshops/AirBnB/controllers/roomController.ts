import { Router } from 'express';
import { ICreateRoomDTO } from '../interfaces/IRoom';

import * as roomService from '../services/roomService';

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
        const result = await roomService.create(roomData);
        res.redirect(`/accommodation/${result._id}`);
    } catch (err: any) {
        res.render('./accommodation/create', {
            title: 'Request Error',
            error: err.message.split('\n')
        });
    }   
});

router.get('/:id', async (req, res) => {
    const roomId = req.params.id;
    const room = await roomService.getById(roomId);

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