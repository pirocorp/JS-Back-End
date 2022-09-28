import { Router } from 'express';

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
    const payload = {
        title: 'Accomodation Details'
    }

    res.render('./accomodation/details', payload);
});

export default router;