import { Socket } from 'socket.io';
import { MatchQueue } from '../models/Match';
import { Player } from '../models/Player';
import IHandler from './IHandler';
import { GameServer } from '../GameServer';


type JoinData = {
    d_id: number;
    nickname: string;
}

class QueueHandler implements IHandler {
    public gameServer: GameServer;
    public matchQueue: MatchQueue = new MatchQueue();

    constructor(gameServer: GameServer) {
        this.gameServer = gameServer;
        setInterval(() => {
            this.matchQueue.checkMatch();
        }, 1000);
    }

    public register(socket: Socket) {
        socket.on('reqQueue', (msg) => {
            const data: JoinData = JSON.parse(msg); 
            console.log("Adding to queue..." + data.nickname);
            // Push socket to a match queue and check if new matches are made
            const player = new Player(data.d_id, data.nickname, socket);
            this.matchQueue.push(player);
            this.gameServer.activePlayers.set(player.id, player);
        });
    }
}


export default QueueHandler;