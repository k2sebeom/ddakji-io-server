import { Server, Socket } from 'socket.io';
import { Match, MatchQueue } from '../models/MatchQueue';
import { Player } from '../models/Player';
import MatchHandler from '../handlers/MatchHandler';


type JoinData = {
    d_id: number;
    nickname: string;
}

class QueueHandler {
    public matchQueue: MatchQueue = new MatchQueue();

    constructor(onMatchMade: {(matches: Match[]): void}) {
        setInterval(() => {
            const newMatches = this.matchQueue.checkMatch();
            for(const m of newMatches) {
                m.player1.socket.emit('recMatch', {
                    rival: {
                        nickname: m.player2.nickname,
                        d_id: m.player2.d_id
                    }
                });
                m.player2.socket.emit('recMatch', {
                    rival: {
                        nickname: m.player1.nickname,
                        d_id: m.player1.d_id
                    }
                });
            }
            if(newMatches.length > 0) {
                onMatchMade(newMatches);
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