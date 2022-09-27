"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const data = {
        title: 'Handlebars Demo',
        username: 'Piroman',
        message: 'Hello World',
        product: {
            name: 'Product 1',
            price: '20',
            color: 'red'
        },
        contacts: [
            {
                name: 'Piroman Piromanov',
                email: 'piro@pirocorp.com'
            },
            {
                name: "Zdravko Zdravkov",
                email: 'zdravkov@pirocorp.com'
            }
        ]
    };
    res.render('./demo/index', data);
    // res.locals.title = 'Handlebars Demo';
    // res.locals.message = 'Hello World';
    // res.render('./home/index');
});
router.get('/img', (req, res) => {
    const filePath = path_1.default.resolve('dist/img/cat.jpeg');
    res.sendFile(filePath);
});
router.get('/download', (req, res) => {
    const filePath = path_1.default.resolve('dist/img/cat.jpeg');
    res.download(filePath);
});
router.get('/data', (req, res) => {
    res.json([
        { name: 'Peter', age: '25' },
        { name: 'Jhon', age: '35' },
        { name: 'Asen', age: '45' },
    ]);
});
exports.default = router;
//# sourceMappingURL=demoController.js.map