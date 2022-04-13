import { Server, Socket } from 'socket.io';
import * as http from 'http';

import QueueHandler from './handlers/QueueHandler';


const startGameServer = (server: http.Server) => {
    const options: object = {
        cors: {
            methods: ["GET", "POST"],
            origin: "*"
        }
    };

    const io = new Server(server, options);
    
    const queueHandler = new QueueHandler(io);

    io.on('connection', (socket: Socket) => {
        console.log("New connection");

        queueHandler.register(socket);

        socket.on('disconnect', () => {
            console.log("Disconnected");
        });
    });
}


export default startGameServer;