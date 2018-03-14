var rn = require('random-number');
var math = require('mathjs');

// TODO some more advanced questions

exports.getRandomMathQuestion = function() {

    var question = '';
    var totalParts = rn({ min: (rn({ min: 2, max: 5, integer: true })), max: (rn({ min: 5, max: 10, integer: true })), integer: true });

    for (var i = 0; i < totalParts; i++) {
        var isNagative = rn({ min: 1, max: 10, integer: true }) === 10;
        question += (i !== 0 ? ' ' + getRandomOperation() + ' ' : '') + (isNagative ? '(-' : '') + rn({ min: 1, max: 5000, integer: true }) + (isNagative ? ')' : '') + (rn({ min: 1, max: 10, integer: true }) === 1 ? '^' + rn({ min: 2, max: 10, integer: true }) : '');
    }

    var answer = math.eval(question);
    
    return {
        question: question,
        answer: answer
    };
};

function getRandomOperation() {
    var randomNumber = rn({ min: 1, max: 4, integer: true });

    switch (randomNumber) {
        case 1:
            return '/';
        case 2:
            return '*';
        case 3:
            return '+';
        case 4:
            return '-';
    }
}
