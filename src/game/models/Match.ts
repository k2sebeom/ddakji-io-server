import { v1 } from 'uuid';
import { Player } from './Player';


class Match {
    uuid: string;
    player1: Player;
    player2: Player;
    turnId: string;
}


class MatchQueue {
    public queue: Player[];
    public matches: Match[];

    constructor() {
        this.queue = [];
        this.matches = [];
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
            const newMatch: Match = { uuid: game_id, player1, player2, turnId: player1.id };
            this.matches.push(newMatch);
            newMatches.push(newMatch);
        }
        return newMatches;
    }
}

export {
    MatchQueue,
    Match
}