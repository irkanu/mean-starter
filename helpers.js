const jwt = require('jsonwebtoken');
const User = require('./models/User');

// moment.js is a handy library for displaying dates.
exports.moment = require('moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Cleans up the hash from Angular
exports.cleanHash = (req, res) => {
    res.redirect('/#' + req.originalUrl);
};

// Verify the JSON web token & attach to user's request
exports.handleJWT = (req, res, next) => {
    req.isAuthenticated = () => {
        const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return false;
        }
    };

    if (req.isAuthenticated()) {
        const payload = req.isAuthenticated();
        User.findById(payload.sub, (err, user) => {
            req.user = user;
            next();
        });
    } else {
        next();
    }
};
