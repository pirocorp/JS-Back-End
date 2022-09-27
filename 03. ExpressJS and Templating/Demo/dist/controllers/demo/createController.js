"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
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
});
exports.default = router;
//# sourceMappingURL=createController.js.map