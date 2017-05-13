const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const moment = require('moment');
const request = require('request');
const routes = require('./routes/index');
const helper = require('./helpers');

// Load environment variables from .env file
dotenv.load();

// Import all of the models
require('./models/User');
require('./models/Org');

// Create the Express app
const app = express();

// Mongoose configuration
mongoose.connect(process.env.MONGODB);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// Gzip and deflate
app.use(compression());

// Enable logging
app.use(logger('dev'));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Exposes a bunch of methods for validating data.
app.use(expressValidator());

// Populates req.cookies with any cookies that came along with the request.
app.use(cookieParser());

// Tell Express to serve static files from the public folder.
// Anything in public/ will just be served up as the file it is.
app.use(express.static(path.join(__dirname, 'public')));

// Verify the JSON web token & attach to user's request
app.use(helper.handleJWT);

// Load our routes!
app.use('/', routes);

// Clean up the Angular # on URL
app.get('*', helper.cleanHash);

// Production error handler
if (app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

app.listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port ' + process.env.PORT || 3000 + ' in ' + app.get('env').toUpperCase() + ' environment.');
});

module.exports = app;
