module.exports = function(socket, io) {

    socket.on('join', function(data) {
        socket.join(data.gameId);
    });

};
