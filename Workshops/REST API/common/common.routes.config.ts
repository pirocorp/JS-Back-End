import express from 'express';

export abstract class CommonRoutesConfig {
    private name: string;
    protected app: express.Application;

    public constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;

        this.configureRoutes();
    };

    public getName() {
        return this.name;
    };

    public abstract configureRoutes(): express.Application;
};