//============================= Packages =============================

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var http = require('http').Server(app);
var io = require('socket.io')(http);

var colors = require('colors');
var HashMap = require('hashmap');

//============================= Pool =============================

var config = require('./config/config');
var mysql = require("mysql");
var pool = mysql.createPool(config.db);

require('require-sql');

//============================= Passport =============================

var passport = require('passport');
require('./config/passport')(passport, pool);

//============================= Letting express use them =============================

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'supersecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    res.locals.user = req.user;

    next();
});

//============================= Values =============================

// TODO change to Redis

var users = [];
var gameId = 0;
var matches = new HashMap();

exports.matches = matches;


//============================= Routes =============================

// Index

var indexRoutes = require("./routes/indexRoutes")();
app.use("/", indexRoutes);

// Math Racer

var homeRoutes = require("./routes/mathRacer/homeRoutes")();
app.use("/home", homeRoutes);

var gameRoutes = require("./routes/mathRacer/gameRoutes")(matches, pool);
app.use("/game", gameRoutes);

// Authentication

var loginRoutes = require("./routes/authentication/loginRoutes")(passport);
app.use("/login", loginRoutes);

var signupRoutes = require("./routes/authentication/signupRoutes")(passport);
app.use("/signup", signupRoutes);

var logoutRoutes = require("./routes/authentication/logoutRoutes")();
app.use("/logout", logoutRoutes);

// Misc

var miscRoutes = require("./routes/misc/miscRoutes")();
app.use("*", miscRoutes);

//============================= Socket io =============================

io.on('connection', function (socket) {

    require('./socketEvents/onFindGame')(users, gameId, matches, socket, io);
    require('./socketEvents/onJoin')(socket, io);
    require('./socketEvents/onCorrectAnswer')(socket, io);
    require('./socketEvents/onFinish')(gameId, matches, socket, io);

});

//============================= Starting Server =============================

http.listen(8080, function () {
    console.log("Server running".rainbow);
});

//============================= Ending Server =============================

require('./utils/nodeEnding').nodeEndingCode(nodeEndInstance);

function nodeEndInstance() {
    console.log("The pool has been closed.".bgBlack.blue);
    pool.end();
};