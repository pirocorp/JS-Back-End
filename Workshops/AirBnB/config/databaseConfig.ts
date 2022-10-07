import { Express } from 'express';

import mongooseService from "../services/common/mongooseService";

export default function databaseConfig(app: Express) {
    mongooseService.instance;
};
