import express = require('express');
import { proxy } from './index';

type Dependency = {};
export default function route(
    optionalDependencies: Dependency
): express.Router {
    //Routes
    const router = express.Router();
    //foo
    fooService(router, optionalDependencies);
    return router;
}

export function fooService(
    router: express.Router,
    dependencies: proxy.ProxyDependencies
) {
    router.get('/fetchConfigs', proxy.proxy(dependencies));
}
