/**
 * Created by adam on 03/09/2016.
 */
var mongoose = require('mongoose');
var eventVideoSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function genUUID() {
            return uuid.v1();
        },
        index: true,
        unique: true
    },
    sourceVideoID: {type: String, required: true, lowercase: true, trim: true},
    sourceVideoCreatedDate: {type: Date, default: Date.now},
    videoURL: {type: String, trim: true},
    htmlToEmbed: {type: String, trim: true},
    dateCreated: {type: Date, default: Date.now},
    dateLastUsed: {type: Date, default: Date.now},
    manualAppyRank: {type: Number, required: false, default: 5},
    autoAppyRank: {type: Number, required: false, default: 5},
    eventDataSource: {type: String, ref: 'eventDataSource'},
    event: {type: String, ref: 'event'}

});

var EventVideo = mongoose.model('eventVideo', eventVideoSchema);
module.exports = EventVideo;
