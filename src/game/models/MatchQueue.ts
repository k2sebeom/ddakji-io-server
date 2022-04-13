import { Socket } from 'socket.io';
import { v1 } from 'uuid';

type Match = {
    uuid: string;
    client1: Socket;
    client2: Socket;
}


class MatchQueue {
    private queue: Socket[];
    private matches: Match[];

    constructor() {
        this.queue = [];
        this.matches = [];
    }

    public push(socket: Socket): void {
        this.queue.push(socket);
    }

    public checkMatch(): Match[] {
        let newMatches: Match[] = [];

        while(this.queue.length > 1) {
            const client1: Socket = this.queue.pop();
            const client2: Socket = this.queue.pop();
            const game_id = v1();
            client1.join('game_' + game_id);
            client2.join('game_' + game_id);
            const newMatch = { uuid: game_id, client1, client2 };
            this.matches.push(newMatch);
            newMatches.push(newMatch);
        }
        return newMatches;
    }
}

export default MatchQueue;