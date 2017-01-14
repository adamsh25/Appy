/**
 * Created by adam on 06/09/2016.
 */

var facebookAPIUtils = require('../../socialMediaUtils/facebookAPIUtils')
    , facebookUtils = require("../facebook/utils")
    , EventVideo = require('../../../../models/EventVideo');

var FacebookEventDataSource = function FacebookEventDataSource(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    this.dataSourceType = this.options.dataSourceType;
    this.eventDataSource = this.options.eventDataSource;
};

FacebookEventDataSource.prototype.fetchData = function () {
    console.log("Start Fetching Data From Facebook Event");
    this.fetchEventVideos();
};


FacebookEventDataSource.prototype.fetchEventVideos = function () {
    var self = this;
    facebookAPIUtils.getEventVideos(this.eventDataSource.sourceID, function (err, res) {
        var videos = res.data;
        if(!err) {
            facebookUtils.handleFetchedVideos(self, videos);
        }else{
            console.error('error in fetchEventVideos. e: ' + err.message);
        }
    });

};

module.exports = FacebookEventDataSource;