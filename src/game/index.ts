import * as express from 'express';
import { Server, Socket } from 'socket.io';
import * as http from 'http';
import { match } from 'assert';
import e = require('express');


const startGameServer = (server: http.Server) => {
    let matchQueue: Socket[] = [];

    const options: object = {
        cors: {
            methods: ["GET", "POST"],
            origin: "*"
        }
    };

    const io = new Server(server, options);
    
    io.on('connection', (socket: Socket) => {
        console.log("New connection");

        socket.on('disconnect', () => {
            console.log("Disconnected");
        });

        socket.on('reqQueue', (data) => {
            console.log("Adding to queue...");
            matchQueue.push(socket);
            console.log(matchQueue);

            if (matchQueue.length > 1) {
                const client1: Socket = matchQueue.pop();
                const client2: Socket = matchQueue.pop();
                client1.join('game');
                client2.join('game');
                io.to('game').emit('evt');
            }
        });
    });
}


export default startGameServer;