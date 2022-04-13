import { Socket } from 'socket.io';


class Player {
    public d_id: number;
    public nickname: string;
    public socket: Socket;

    constructor(d_id: number, nickname: string, socket: Socket) {
        this.d_id = d_id;
        this.nickname = nickname;
        this.socket = socket;
    }
}

export { Player }