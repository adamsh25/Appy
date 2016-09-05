/**
 * Created by adam on 03/09/2016.
 */
var mongoose = require('mongoose')
    , uuid = require('uuid');
var locationSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function genUUID() {
            return uuid.v1();
        },
        index: true,
        unique: true
    },
    lat: {type: Number, required: true},
    long: {type: Number, required: true},
    source: {type: String, required: false, default:'manual'},
    manualAppyRank: {type: Number, required: false, default: 5},
    autoAppyRank: {type: Number, required: false, default: 5},
    event: {type: String, ref: 'event'}

});
var Location = mongoose.model('locationSchema', locationSchema);
module.exports = Location;