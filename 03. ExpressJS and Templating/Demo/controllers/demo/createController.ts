import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send(`
        <form method="POST">
            <input name="name" />
            <button type="submit">Send</button>
        </form>
    `);
});

router.post('/', (req, res) => {        
        res.redirect('/catalog');
    }
);

export default router;