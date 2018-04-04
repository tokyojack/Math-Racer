var delayed = require('delayed');

module.exports = function(socket, io) {

    socket.on('correct_answer', function(data) {
        io.sockets.in(data.gameId).emit('correct_answer', { username: data.username, answer: data.answer });

        delayed.delay(() => io.emit('finish'), 5000);
    });

};
