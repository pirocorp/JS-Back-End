"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Catalog Page');
});
router.get('/:productId', (req, res) => {
    res.send(`Product Details Page: ${req.params.productId}`);
});
router.get('/:category/:id', (req, res) => {
    res.send(`Nested Parameters: Category: ${req.params.category}, Product Id: ${req.params.id}`);
});
exports.default = router;
//# sourceMappingURL=catalogController.js.map