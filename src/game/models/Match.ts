import { v1 } from 'uuid';
import { Player } from './Player';


class Match {
    uuid: string;
    player1: Player;
    player2: Player;
    turnId: string;

    constructor(uuid: string, player1: Player, player2: Player) {
        this.uuid = uuid;
        this.player1 = player1;
        this.player2 = player2;
        this.turnId = player1.id;

        this.player1.match = this;
        this.player2.match = this;
    }
}


class MatchQueue {
    public queue: Player[];

    constructor() {
        this.queue = [];
    }

    public push(player: Player): void {
        this.queue.push(player);
    }

    public checkMatch(): Match[] {
        let newMatches: Match[] = [];

        while(this.queue.length > 1) {
            const player1: Player = this.queue.pop();
            const player2: Player = this.queue.pop();
            const game_id = v1();
            player1.socket.join('game_' + game_id);
            player2.socket.join('game_' + game_id);
            player1.socket.emit('recMatch', {
                rival: {
                    nickname: player2.nickname,
                    d_id: player2.d_id
                }
            });
            player2.socket.emit('recMatch', {
                rival: {
                    nickname: player1.nickname,
                    d_id: player1.d_id
                }
            });
            const newMatch: Match = new Match(game_id, player1, player2);
            newMatches.push(newMatch);
        }
        return newMatches;
    }
}

export {
    MatchQueue,
    Match
}