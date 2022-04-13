import { Server, Socket } from 'socket.io';
import * as http from 'http';
import MatchQueue from './models/MatchQueue';


const startGameServer = (server: http.Server) => {
    let matchQueue: MatchQueue = new MatchQueue();

    setInterval(() => {
        const newMatches = matchQueue.checkMatch();
        for(const m of newMatches) {
            io.to('game_' + m.uuid).emit('evt');
        }
    }, 1000);

    const options: object = {
        cors: {
            methods: ["GET", "POST"],
            origin: "*"
        }
    };

    const io = new Server(server, options);
    
    io.on('connection', (socket: Socket) => {
        console.log("New connection");

        socket.on('disconnect', () => {
            console.log("Disconnected");
        });

        socket.on('reqQueue', (data) => {
            console.log("Adding to queue...");
            // Push socket to a match queue and check if new matches are made
            matchQueue.push(socket);    
        });
    });
}


export default startGameServer;