const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const request = require('request');
const routes = require('./routes/index');

// Load environment variables from .env file
dotenv.load();

// Models
const User = require('./models/User');

const app = express();

mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    req.isAuthenticated = function () {
        var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return false;
        }
    };

    if (req.isAuthenticated()) {
        var payload = req.isAuthenticated();
        User.findById(payload.sub, function (err, user) {
            req.user = user;
            next();
        });
    } else {
        next();
    }
});

// Load our routes!
app.use('/', routes);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.get('*', function (req, res) {
    res.redirect('/#' + req.originalUrl);
});

// Production error handler
if (app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port') + ' in ' + app.get('env').toUpperCase() + ' environment.');
});

module.exports = app;
