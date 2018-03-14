var mathQuestionManager = require('./../questions/mathQuestionManager');


module.exports = function(users, gameId, matches, socket, io) {

    socket.on('find_game', function(user) {
        socket.join(user.userId);
        users.push(user);

        if (users.length <= 1)
            return;

        gameId++;

        var question = mathQuestionManager.getRandomMathQuestion();

        var match = {
            gameId: gameId,
            question: question.question,
            answer: question.answer,
            user_1: {
                username: users[0].username,
                id: users[0].userId
            },
            user_2: {
                username: users[1].username,
                id: users[1].userId
            }
        };

        matches.set(gameId, match);

        users.forEach(user => io.sockets.in(user.userId).emit('match_found', { gameId: gameId }));

        // users = []; - Wasn't working, test
        users.length = 0;
    });

};
