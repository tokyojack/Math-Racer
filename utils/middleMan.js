var flashUtils = require("./flashUtils");
var matches = require("./index").matches;

exports.checkIfUserIsInGame = function (req, res, next) {
    if (!isLoggedIn(req, res))
        return;

    var match = matches.get(req.params.id);
    var userId = req.user.id;

    if (!(match.user_1.id == userId || match.user_2 == userId))
        return;

    next();
};

exports.isLoggedIn = function (req, res, next) {
    if (!isLoggedIn(req, res)) return;

    return next();
};

function isLoggedIn(req, res) {
    if (req.isAuthenticated()) return true;

    req.flash("error", "You must be logged in todo that.");
    res.redirect("/login");
    return false;
}