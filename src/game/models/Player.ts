import { Socket } from 'socket.io';
import Ddakji from './Ddakji';
import { Match } from './Match';


class Player {
    public id: string;
    public ddakji: Ddakji
    public nickname: string;
    public socket: Socket;
    public match?: Match;

    constructor(d_id: number, nickname: string, socket: Socket) {
        this.id = socket.id;
        this.ddakji = new Ddakji(d_id);
        this.nickname = nickname;
        this.socket = socket;
    }
}

export { Player }