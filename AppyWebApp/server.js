/**
 * MODULE DEPENDENCIES
 * -------------------------------------------------------------------------------------------------
 * include any modules you will use through out the file
 **/

var express = require('express')
    , nconf = require('nconf')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , mongoose = require('mongoose')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , expressStatic = require('express-static')
    , errorHandler = require('errorhandler')
    , path = require('path');


/**
 * CONFIGURATION
 * -------------------------------------------------------------------------------------------------
 * load configuration settings from ENV, then settings.json.  Contains keys for OAuth logins. See
 * settings.example.json.
 **/
nconf.env().file({file: 'settings.json'});

mongoose.Promise = global.Promise;

var app = express();
var router = express.Router();
mongoose.connect('mongodb://localhost:27017/appy');

/**
 * ROUTING
 * -------------------------------------------------------------------------------------------------
 * include a route file for each major area of functionality in the site
 **/
require('./routes/home')(router);
require('./routes/event')(router);
require('./routes/eventDataSource')(router);
require('./routes/eventVideo')(router);
app.use('/', router);

var port = process.env.PORT || 3030;

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser('azure zomg'));
app.use(session({
    secret: 'appy app lilo',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));
app.use(require('less-middleware')({src: __dirname + '/public'}));
app.use(expressStatic(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
    app.use(errorHandler());
}



/**
 * RUN
 * -------------------------------------------------------------------------------------------------
 * this starts up the server on the given port
 **/
app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
