import * as express from 'express';
import route from './proxy-service/routes';
;

export type MountRouteDependencies = {};
export function mountRoutes(
    optionalDependencies: MountRouteDependencies,
    app: express.Express
): express.Express {
app.use(
  '/',
   route(optionalDependencies)
   );
return app;
}
