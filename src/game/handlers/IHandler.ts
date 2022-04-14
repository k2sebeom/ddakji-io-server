import { GameServer } from '../index';
import { Socket } from 'socket.io';

interface IHandler {
    gameServer: GameServer;
    register(socket: Socket): void;
}

export default IHandler;