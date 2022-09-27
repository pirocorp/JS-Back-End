import { Router } from 'express';

import * as productService from '../services/productService';

const router = Router();

router.get('/', (req, res) => {
    res.render('./catalog/create');
});

router.post('/', async (req, res, next) => {
    const url = req.baseUrl + (req.url == '/' ? '' : req.url);
    console.log(`>>> Handling POST ${url} ${JSON.stringify(req.body)}`);

    const name = req.body.name;
    const price = parseFloat(req.body.price);

    try{
        await productService.create(name, price);   
    }catch(err){
        next(err)
    }   
    
    res.redirect('/catalog');
});

export default router;