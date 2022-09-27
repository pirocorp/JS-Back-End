"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.render('./home/index');
});
router.get('/about', (req, res) => {
    res.render('./home/about');
});
exports.default = router;
//# sourceMappingURL=homeController.js.map