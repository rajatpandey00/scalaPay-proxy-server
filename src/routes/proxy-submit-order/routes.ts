import express from 'express';
import { submit } from './index';

type Dependency = {};
export default function route(
    optionalDependencies: Dependency
): express.Router {
    //Routes
    const router = express.Router();
    //submit Order
    service(router, optionalDependencies);
    return router;
}

export function service(
    router: express.Router,
    dependencies: submit.ProxyDependencies
) {
    router.post('/submitOrders', submit.orderSubmit(dependencies));
}