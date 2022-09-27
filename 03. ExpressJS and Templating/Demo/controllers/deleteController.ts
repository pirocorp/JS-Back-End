import { Router } from 'express';

import * as productService from '../services/productService';

const router = Router();

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const product = productService.getById(productId);
  

    res.render('./catalog/delete', {
        product,
        productId
    });
});

router.post('/:id', async (req, res, next) => {
    const productId = req.params.id;
    
    try {
        await productService.deleteById(productId);
    } catch (err) {
        next(err);
    }

    res.redirect('/catalog');
});

export default router;