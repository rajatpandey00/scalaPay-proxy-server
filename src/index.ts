//Code to tell server to start

import { start } from './start';

start().catch((error) => {
    console.log('Error Occurred with error', error);
});
