var router = require("express").Router();

// URL: "/signup"
module.exports = function(passport) {

    // "signup.ejs" page
    router.get("/", function(req, res) {
        res.render("authentication/signup.ejs");
    });

    // Sign's parson when the form is subbmitted
    router.post('/', passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/signup'
    }));

    return router;
};
