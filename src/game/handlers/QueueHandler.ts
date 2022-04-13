import { Server, Socket } from 'socket.io';
import MatchQueue from '../models/MatchQueue';
import { Player } from '../models/Player';


type JoinData = {
    d_id: number;
    nickname: string;
}

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
        socket.on('reqQueue', (data: JoinData) => {
            console.log("Adding to queue..." + data.nickname);
            // Push socket to a match queue and check if new matches are made
            this.matchQueue.push(new Player(data.d_id, data.nickname, socket));
        });
    }
}


export default QueueHandler;