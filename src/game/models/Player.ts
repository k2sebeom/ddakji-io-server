import { Socket } from 'socket.io';
import { Match } from './Match';


class Player {
    public id: string;
    public d_id: number;
    public nickname: string;
    public socket: Socket;
    public match?: Match;

    constructor(d_id: number, nickname: string, socket: Socket) {
        this.id = socket.id;
        this.d_id = d_id;
        this.nickname = nickname;
        this.socket = socket;
    }
}

export { Player }