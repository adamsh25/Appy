/**
 * Created by adam on 03/09/2016.
 */
var restify = require('express-restify-mongoose')
    , EventVideoSchema = require('../models/EventVideo.js');


var optionsEventDataSourceSchema = {
    // postCreate: function (req, res, next) {
    //     var x = req.body;
    //     var y = x;
    // }
};
module.exports = function (router) {
    restify.serve(router, EventVideoSchema, optionsEventDataSourceSchema);
};