import { Router } from 'express';

import * as productService from '../services/productService';

const router = Router();

router.get('/', (req, res) => {
    const products = productService.getList();

    res.render('./catalog/index', {
        products
    });
});

router.get('/:producId', (req, res) => {
    const productId = req.params.producId;
    const product = productService.getById(productId);

    res.render('./catalog/product', {
        product,
        productId
    });
});

export default router;