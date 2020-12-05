import express, { NextFunction } from 'express';
import { routes } from './routes';
import { env } from './kit/env';
import cors from 'cors';
import { middlewareJWT } from './auth/middleware';

const PORT = parseInt(env.getEnvValue('PORT'));

const MountRouteDependencies = {
    appName: `Node Proxy Server Started at PORT ${PORT}`,
};
export async function start(): Promise<express.Express> {
    const app = express();
    app.use(cors());
    app.use('/', (req: express.Request, res: express.Response, next: NextFunction) => middlewareJWT(req, res, next))
    routes.mountRoutes(MountRouteDependencies, app);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });
    app.on('exit', (code) => {
        //any connection that can be closed as well
        console.log('Server exit with code', code);
    });
    return app;
}
