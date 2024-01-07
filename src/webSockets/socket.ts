import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer;

export const initializeSocketIO = (httpServer: any) => {
    io = new SocketIOServer(httpServer);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
};

export const getSocketIO = () => io;
