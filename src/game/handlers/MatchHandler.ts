import { Server, Socket } from 'socket.io';
import { Match } from '../models/MatchQueue';


class MatchHandler {
    private server: Server;

    constructor(server: Server) {
        this.server = server;
    }

    public register(match: Match): void {
        match.player1.socket.on('reqAttack', (data) => {
            console.log(match);
        });
        match.player2.socket.on('reqAttack', (data) => {
            if(match.turnId == match.player2.id) {
                // DO calculation and return recAttackResult
            }
        })
    }
}

export default MatchHandler;