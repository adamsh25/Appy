/**
 * Created by adam on 03/09/2016.
 */

var mongoose = require('mongoose')
    , uuid = require('uuid');

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
    event: {type: String, ref: 'event'}

});
appyEventDataSourceSchema.index({source: 1, sourceID: 1, sourceType: 1}, {unique: true});

var EventDataSource = mongoose.model('eventDataSource', appyEventDataSourceSchema);
module.exports = EventDataSource;
