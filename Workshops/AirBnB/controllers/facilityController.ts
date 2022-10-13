import { Router } from 'express';

import { hasRole } from '../middlewares/guards';

import * as roomService from '../services/roomService';
import * as facilityService from '../services/facilityService';

const router = Router();

router.get('/create', hasRole('admin'), (req, res) => {
    // show creation form
    res.render('./facility/create', {
        title: 'Create New Facility'
    });
});

router.post('/create', hasRole('admin'), async (req, res) => {
    const label = req.body.label;
    const iconUrl = req.body.iconUrl;

    try {
        facilityService.createFacility(label, iconUrl);
        res.redirect('/catalog');
    } catch (error: any) {
        res.render('./facility/create', {
            title: 'Create New Facility',
            errors: error.message.split('\n')
        });
    }
});

router.get('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await roomService.getRoomDetailsById(roomId);

    if (!req.user || room?.owner._id != req.user._id) {
        return res.redirect('/auth/login');
    }

    const facilities = await facilityService.getAllAvailable(room?.facilities);

    res.render('./facility/decorate', {
        title: 'Add Facility',
        subtitle: 'Edit',
        room,
        facilities
    });
});

router.post('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await roomService.getRoomDetailsById(roomId);

    if (!req.user || room?.owner._id != req.user._id) {
        return res.redirect('/auth/login');
    }
    
    const facilities = Object.keys(req.body);

    await facilityService.addFacilitiesToRoom(roomId, facilities);

    res.redirect(`/accommodation/${roomId}`);
});

export default router;
