import * as express from 'express';
import config from './config';

import loaders from './loaders';
import { GameServer } from './game/GameServer';


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

    const gameServer = new GameServer(server, {
        cors: {
            methods: ["GET", "POST"],
            origin: "*"
        }
    })
}

runServer();
