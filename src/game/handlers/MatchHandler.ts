import { Socket } from 'socket.io';
import { GameServer } from '../GameServer';
import { Match } from '../models/Match';
import Vector from '../models/utils/Vector';
import IHandler from './IHandler';


class MatchHandler implements IHandler {
    public gameServer: GameServer;

    constructor(gameServer: GameServer) {
        this.gameServer = gameServer;
    }

    public register(socket: Socket): void {
        socket.on('reqAttack', (msg) => {
            const data = JSON.parse(msg);
            const player = this.gameServer.activePlayers.get(socket.id);
            const match = player.match;

            if(match.turnId != player.id) {
                console.log("It's not your turn");
                return;
            }
            const other = match.player1.id == player.id ? match.player2 : match.player1;
            const packet = player.ddakji.attack(other.ddakji, new Vector(data.x, data.y));
            console.log(msg);
            console.log(packet);
            this.gameServer.io.to('game_' + match.uuid).emit('recAttackResult', packet);
            match.turnId = other.id;
        });
    }
}

export default MatchHandler;