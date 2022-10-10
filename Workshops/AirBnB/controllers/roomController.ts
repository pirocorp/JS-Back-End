import { Router } from 'express';

import * as roomService from '../services/roomService';
import { hasUser } from '../middlewares/guards';

import { IRoomDTO } from '../interfaces/IRoom';
import { IJwtUser } from '../interfaces/IUser';

const router = Router();

router.get('/create', hasUser(), (req, res) => {
    const payload = {
        title: 'Host New Accomodation',
        room: {}
    };

    res.render('./room/create', payload);
});

router.post('/create', hasUser(), async (req, res) => {
    const roomData = req.body as IRoomDTO;
    const ownerId = (req.user as IJwtUser)._id;

    try {
        const result = await roomService.create(roomData, ownerId.toString());
        res.redirect(`/accommodation/${result._id}`);
    } catch (err: any) {
        res.render('./room/create', {
            title: 'Request Error',
            errors: err.message.split('\n'),
            room: roomData
        });
    }
});

router.get('/:id', async (req, res) => {
    const roomId = req.params.id;
    const room = await roomService.getRoomDetailsById(roomId);

    const isOwner = req.user && (req.user as IJwtUser)._id == room?.owner._id;

    const payload = {
        title: 'Accomodation Details',
        subtitle: 'Details',
        room,
        roomId,
        isOwner
    };

    if (room) {
        res.render('./room/details', payload);
    } else {
        res.render('./room/roomNotFound', payload);
    }
});

router.get('/:id/edit', async (req, res) => {
    const roomId = req.params.id;
    const room = await roomService.getRoomDetailsById(roomId);

    if(!req.user || room?.owner._id != req.user._id) {
        return res.redirect('/auth/login');
    }

    const payload = {
        title: 'Accomodation Edit',
        subtitle: 'Edit',
        room,
        roomId
    };

    if (room) {
        res.render('./room/edit', payload);
    } else {
        res.render('./room/roomNotFound', payload);
    }
});

router.post('/:id/edit', async (req, res) => {
    const roomData = req.body as IRoomDTO;
    const roomId = req.params.id;

    const room = await roomService.getRoomDetailsById(roomId);

    if(!req.user || room?.owner._id != req.user._id) {
        return res.redirect('/auth/login');
    }

    try {
        await roomService.edit(roomData, roomId);
        res.redirect(`/accommodation/${roomId}`);
    } catch (err: any) {
        res.render(`./room/edit`, {
            title: 'Request Error',
            errors: err.message.split('\n'),
            room: roomData,
            roomId
        });
    }
});

router.get('/:id/delete', async (req, res) => {
    const roomId = req.params.id;
    const room = await roomService.getRoomDetailsById(roomId);  

    if(!req.user || room?.owner._id != req.user._id) {
        return res.redirect('/auth/login');
    }

    const payload = {
        title: 'Delete Accomodation',
        subtitle: 'Delete',
        room,
        roomId
    };

    res.render('./room/delete', payload);
});

router.post('/:id/delete', async (req, res) => {
    const roomId = req.params.id;
    const room = await roomService.getRoomDetailsById(roomId);  

    if(!req.user || room?.owner._id != req.user._id) {
        return res.redirect('/auth/login');
    }

    try {
        await roomService.deleteById(roomId);
        res.redirect(`/catalog`);
    } catch (err: any) {
        res.render(`./room/delete`, {
            title: 'Request Error',
            errors: err.message.split('\n'),
            room,
            roomId
        });
    }
});

export default router;
