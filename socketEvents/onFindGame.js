var mathQuestionManager = require('./../questions/mathQuestionManager');

module.exports = function(users, gameId, matches, socket, io) {

    socket.on('find_game', function(user) {
        socket.join(user.userId);
        users.push(user);

        if (users.length <= 1)
            return;


        // You would most likely want to do a more intricate game-finding system, but this is fine for this level that
        // i'm running it at   

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

        // Emit's that a match has been found, redirecting the person
        users.forEach(user => io.sockets.in(user.userId).emit('match_found', { gameId: gameId }));

        // users = []; This doesn't clear it
        users.length = 0;
    });

};
