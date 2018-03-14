var socketController = (function() {


    return {
        placeFill: function(message, socket) {

        }
    };

})();

var UIController = (function() {
    var DOMstrings = {
        answerInput: '#answer-input',
    };

    return {
        getAnswerInputValue: function() {
            return document.querySelector(DOMstrings.answerInput).value;
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

var controller = (function(socketCtrl, UICtrl) {

    var socket = io();

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();


        document.querySelector(DOM.answerInput).addEventListener('keypress', function(event) {
            var keyCode = event.keyCode;
            var which = event.which;

            if (keyCode === 13 || which === 13) {
                var answer = document.querySelector('answer').innerHTML;
                if (UICtrl.getAnswerInputValue() === answer) {
                    var username = document.querySelector('username').innerHTML;
                    var gameId = parseInt(document.querySelector('gameId').innerHTML);

                    socket.emit('correct_answer', { username: username, answer: answer, gameId: gameId });
                }
            }


            if (!(
                    (keyCode === 48 || which === 48) ||
                    (keyCode === 49 || which === 49) ||
                    (keyCode === 50 || which === 50) ||
                    (keyCode === 51 || which === 51) ||
                    (keyCode === 52 || which === 52) ||
                    (keyCode === 53 || which === 53) ||
                    (keyCode === 54 || which === 54) ||
                    (keyCode === 55 || which === 55) ||
                    (keyCode === 56 || which === 56) ||
                    (keyCode === 57 || which === 57)
                )) {
                event.preventDefault();
                return false;
            }


        });


        socket.on("correct_answer", function(data) {
            Materialize.toast("'" + data.username + "' won with '" + data.answer + "'", 5000, 'rounded toastSuccess');
        });

        socket.on("finish", function(data) {
            window.location.href = '/home'
        });

        var gameId = parseInt(document.querySelector('gameId').innerHTML);
        socket.emit('join', { gameId: gameId });
    };

    return {
        init: function() {
            setupEventListeners();
        }
    };
})(socketController, UIController);
controller.init();
