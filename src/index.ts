import * as express from 'express';
import config from './config';

import loaders from './loaders';
import startGameServer from './game';
import { start } from 'repl';


async function runServer() {
    const app = express();

    await loaders({ expressApp: app });
    
    const server = app.listen(config.port, () => {
        console.log(`
            ##################################################
            🛡️  Server listening on : http://localhost:${config.port} 🛡️
            ##################################################
        `);
    });

    startGameServer(server);
}

runServer();
