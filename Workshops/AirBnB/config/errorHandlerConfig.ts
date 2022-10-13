import { Express } from "express";
import { errorHandlingMiddleware } from "../middlewares/errorHandlingMiddleware";

export default function errorHandlerConfig(app: Express) {
    app.use(errorHandlingMiddleware())
}