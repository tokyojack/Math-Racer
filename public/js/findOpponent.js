var socketController = (function() {

    var userId = parseInt(document.querySelector('userId').innerHTML);
    var username = document.querySelector('username').innerHTML;

    return {
        findGame: function(socket) {
            var user = {
                userId: userId,
                username: username
            }
            socket.emit('find_game', user);
        }
    };

})();

var UIController = (function() {

    var DOMstrings = {
        messageInput: '.message-input',
        button: 'button'
    };

    return {
        addLoader: function() {


            var loader = '  <div class="preloader-wrapper big active">\
    <div class="spinner-layer spinner-blue-only">\
      <div class="circle-clipper left">\
        <div class="circle"></div>\
      </div><div class="gap-patch">\
        <div class="circle"></div>\
      </div><div class="circle-clipper right">\
        <div class="circle"></div>\
      </div>\
    </div>\
  </div>'

            document.querySelector('main').insertAdjacentHTML('beforeend', loader);
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

        document.querySelector(DOM.button).addEventListener('click', function(event) {
            socketCtrl.findGame(socket);
            UICtrl.addLoader();
        });

        socket.on("match_found", function(game) {
            window.location.href = '/game/' + game.gameId;
        });

    };


    return {
        init: function() {
            setupEventListeners();
        }
    };
})(socketController, UIController);

controller.init();
