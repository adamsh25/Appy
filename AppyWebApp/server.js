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
    , restify = require('express-restify-mongoose')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , exspressStatic = require('express-static')
    , errorHandler = require('errorhandler')
    , uuid = require('uuid')
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

/**
 * ROUTING
 * -------------------------------------------------------------------------------------------------
 * include a route file for each major area of functionality in the site
 **/
require('./routes/home')(router);

mongoose.connect('mongodb://localhost:27017/appy');

var appyEventSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function genUUID() {
            return uuid.v1();
        },
        index: true,
        unique: true
    },
    dateCreated: {type: Date, default: Date.now},
    manualAppyRank: {type: Number, required: false, default: 5},
    autoAppyRank: {type: Number, required: false, default: 5},
    eventName: {type: String, required: false, unique: true, index: true, lowercase: true, trim: true}
});

var appyEventDataSourceSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function genUUID() {
            return uuid.v1();
        },
        index: true,
        unique: true
    },
    source: {type: String, required: true, lowercase: true, trim: true},
    sourceID: {type: String, required: true, lowercase: true, trim: true},
    sourceType: {type: String, required: true, lowercase: true, trim: true},
    dateCreated: {type: Date, default: Date.now},
    dateLastUsed: {type: Date, default: Date.now},
    manualAppyRank: {type: Number, required: false, default: 5},
    autoAppyRank: {type: Number, required: false, default: 5},
    event: {type: String, ref: 'eventDataSource'}

});
appyEventDataSourceSchema.index({ source: 1, sourceID: 1, sourceType:1 }, { unique: true });

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
app.use(exspressStatic(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
    app.use(errorHandler());
}


var optionsEventSchema = {
    // postCreate: function (req, res, next) {
    //     var x = req.body;
    //     var y = x;
    // }
};
var optionsEventDataSourceSchema = {
    // postCreate: function (req, res, next) {
    //     var x = req.body;
    //     var y = x;
    // }
};
restify.serve(router, mongoose.model('event', appyEventSchema), optionsEventSchema);
restify.serve(router, mongoose.model('eventDataSource', appyEventDataSourceSchema), optionsEventDataSourceSchema);

app.use('/', router);


/**
 * RUN
 * -------------------------------------------------------------------------------------------------
 * this starts up the server on the given port
 **/
app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
