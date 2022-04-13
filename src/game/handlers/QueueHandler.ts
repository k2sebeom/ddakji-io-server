import { Server, Socket } from 'socket.io';
import MatchQueue from '../models/MatchQueue';


class QueueHandler {
    public matchQueue: MatchQueue = new MatchQueue();

    constructor(server: Server) {
        setInterval(() => {
            const newMatches = this.matchQueue.checkMatch();
            for(const m of newMatches) {
                server.to('game_' + m.uuid).emit('evt');
            }
        }, 1000);
    }

    public register(socket: Socket) {
        socket.on('reqQueue', () => {
            console.log("Adding to queue...");
            // Push socket to a match queue and check if new matches are made
            this.matchQueue.push(socket);    
        });
    }
}


export default QueueHandler;