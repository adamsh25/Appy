/**
 * Created by adam on 03/09/2016.
 */
var mongoose = require('mongoose');
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

var Event = mongoose.model('event', appyEventSchema);
module.exports = Event;
