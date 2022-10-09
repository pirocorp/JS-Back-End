import { Router } from 'express';

import * as roomService from '../services/roomService';
import { hasUser } from '../middlewares/guards';

import { ICreateRoomDTO } from '../interfaces/IRoom';

const router = Router();

router.get(
    '/create',
    hasUser(),
    (req, res) => {
        const payload = {
            title: 'Host New Accomodation'
        };

        res.render('./room/create', payload);
});

router.post(
    '/create', 
    hasUser(),
    async (req, res) => {
        const roomData = req.body as ICreateRoomDTO;

        try {
            const result = await roomService.create(roomData);
            res.redirect(`/accommodation/${result._id}`);
        } catch (err: any) {
            res.render('./room/create', {
                title: 'Request Error',
                errors: err.message.split('\n')
            });
        }   
});

router.get('/:id', async (req, res) => {
    const roomId = req.params.id;
    const room = await roomService.getById(roomId);

    const payload = {
        title: 'Accomodation Details',
        subtitle: 'Details',
        room,
        roomId,
    };

    if(room){
        res.render('./room/details', payload);
    }else{
        res.render('./room/roomNotFound', payload)
    }    
});

export default router;
