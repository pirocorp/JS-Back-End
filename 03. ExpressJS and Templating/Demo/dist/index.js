"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const homeController_1 = __importDefault(require("./controllers/homeController"));
const catalogController_1 = __importDefault(require("./controllers/catalogController"));
const createController_1 = __importDefault(require("./controllers/createController"));
const deleteController_1 = __importDefault(require("./controllers/deleteController"));
const demoController_1 = __importDefault(require("./controllers/demo/demoController"));
const catalogController_2 = __importDefault(require("./controllers/demo/catalogController"));
const createController_2 = __importDefault(require("./controllers/demo/createController"));
const logger_1 = require("./middlewares/logger");
const handlebars = (0, express_handlebars_1.create)({
    extname: '.hbs',
});
const app = (0, express_1.default)();
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', './dist/views');
app.use((0, logger_1.globalLogger)()); // loging middleware user-defined
app.use(express_1.default.static('dist')); // middleware serving static files
app.use(express_1.default.urlencoded({
    extended: false
})); // middleware for parsing form data adds body in the req object
app.use(homeController_1.default);
app.use('/catalog', catalogController_1.default);
app.use('/create', createController_1.default);
app.use('/delete', deleteController_1.default);
app.use('/demo', demoController_1.default);
app.use('/demo/catalog', catalogController_2.default);
app.use('/demo/create', createController_2.default);
app.all('*', (req, res) => {
    res.status(404).send('404 Not Found!');
});
app.listen(3000);
//# sourceMappingURL=index.js.map