import { Router } from 'express';

import * as roomService from '../services/roomService';
import * as facilityService from '../services/facilityService';

const router = Router();

router.get('/create', (req, res) => {
    // show creation form
    res.render('./facility/create', {
        title: 'Create New Facility'
    });
});

router.post('/create', async (req, res) => {
    const label = req.body.label;
    const iconUrl = req.body.iconUrl;

    try {
        facilityService.createFacility(label, iconUrl);
        res.redirect('/catalog');
    } catch (error) {
        res.render('./facility/create', {
            title: 'Create New Facility',
            error: [error]
        });
    }
    
    // take data from body
    // create model instance
    // profit
});

router.get('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;

    const room = await roomService.getById(roomId);
    const available = room?.facilities.map(f => f._id.toString()) ?? [];
    const facilities = await facilityService.getAllAvailable(available);

    res.render('./facility/decorate', {
        title: 'Add Facility',
        subtitle: 'Edit',
        room,
        facilities
    });
});

router.post('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const facilities = Object.keys(req.body);

    await facilityService.addFacilitiesToRoom(roomId, facilities); 

    res.redirect(`/accommodation/${roomId}`);
});

export default router;
