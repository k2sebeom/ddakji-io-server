import { Socket } from 'socket.io';
import { GameServer } from '../GameServer';
import { Match } from '../models/Match';
import IHandler from './IHandler';

class MatchHandler implements IHandler {
    public gameServer: GameServer;

    constructor(gameServer: GameServer) {
        this.gameServer = gameServer;
    }

    public register(socket: Socket): void {
        socket.on('reqAttack', (data) => {
            const player = this.gameServer.activePlayers.get(socket.id);
            const match = player.match;
            console.log(match.uuid);
            console.log('fighting with ' + match.player2.nickname);
        });
        socket.on('reqAttack', (data) => {
            
        })
    }
}

export default MatchHandler;