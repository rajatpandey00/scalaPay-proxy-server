import express = require('express');
import { getConfigs } from './index';

type Dependency = {};
export default function route(
    optionalDependencies: Dependency
): express.Router {
    //Routes
    const router = express.Router();
    //foo
    fetchService(router, optionalDependencies);
    return router;
}

export function fetchService(
    router: express.Router,
    dependencies: getConfigs.ProxyDependencies
) {
    router.get('/fetchConfigs', getConfigs.get(dependencies));
}
