import { Server, Socket } from 'socket.io';
import * as http from 'http';

import QueueHandler from './handlers/QueueHandler';
import MatchHandler from './handlers/MatchHandler';


class GameServer {
    public io: Server;
    public queueHandler: QueueHandler;
    public matchHandler: MatchHandler;

    constructor(server: http.Server, options: object) {
        // Initialize socket.io server
        this.io = new Server(server, options);

        // Setup Handlers
        this.matchHandler = new MatchHandler(this.io);
        this.queueHandler = new QueueHandler(this);

        // On connection
        this.io.on('connection', (socket: Socket) => {
            console.log("New connection " + socket.id);
    
            this.queueHandler.register(socket);
    
            socket.on('disconnect', () => {
                console.log("Disconnected");
            });
        });
    }
}

export {
    GameServer
}