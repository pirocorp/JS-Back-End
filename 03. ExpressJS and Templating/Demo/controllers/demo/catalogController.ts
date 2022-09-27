import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Catalog Page');
});

router.get('/:productId', (req, res) => {
    res.send(`Product Details Page: ${req.params.productId}`);
});

router.get('/:category/:id', (req, res) => {
    res.send(`Nested Parameters: Category: ${req.params.category}, Product Id: ${req.params.id}`);
});

export default router;