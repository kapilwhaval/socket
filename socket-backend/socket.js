const io = require('socket.io')(5002);

exports.initSocket = () => {

    io.on('connection', (socket) => {

        const room = socket.handshake.query.roomId;

        socket.join(room);

        socket.on('sendMessage', (data) => {
            // Database operations here
            io.to(room).emit('receiveMessage', data);
        })
    })
}