var router = require("express").Router();

var middleMan = require("../../utils/middleMan");

// URL: "/game"
module.exports = function(matches, pool) {

    // "game.ejs" page
    router.get("/:id", middleMan.checkIfUserIsInGame, function(req, res) {
        var id = parseInt(req.params.id);

        var match = matches.get(id);

        res.render("messenging/game.ejs", {
            id: id,
            username: req.user.username,
            question: match.question,
            answer: match.answer
        });
    });

    return router;
};
