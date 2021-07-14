import * as express from 'express';
import route from './proxy-get-configs/routes';
import submitRoute from './proxy-submit-order/routes';

export type MountRouteDependencies = {};
export function mountRoutes(
    optionalDependencies: MountRouteDependencies,
    app: express.Express
): express.Express {
    app.use('/', route(optionalDependencies));
    app.use('/', submitRoute(optionalDependencies));
    return app;
}
