import { Server, Socket } from 'socket.io';
import * as http from 'http';

import QueueHandler from './handlers/QueueHandler';
import MatchHandler from './handlers/MatchHandler';


const startGameServer = (server: http.Server) => {
    const options: object = {
        cors: {
            methods: ["GET", "POST"],
            origin: "*"
        }
    };

    const io = new Server(server, options);

    const matchHandler = new MatchHandler(io);
    const queueHandler = new QueueHandler((matches) => {
        for(const m of matches) {
            matchHandler.register(m);
        }
    });

    io.on('connection', (socket: Socket) => {
        console.log("New connection " + socket.id);

        queueHandler.register(socket);

        socket.on('disconnect', () => {
            console.log("Disconnected");
        });
    });
}


export default startGameServer;