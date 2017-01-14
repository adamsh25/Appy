/**
 * Created by adam on 06/09/2016.
 */

var facebookAPIUtils = require("../../socialMediaUtils/facebookAPIUtils")
    , facebookUtils = require("../facebook/utils")
    , EventDataSource = require('../../../../models/EventDataSource')
    , EventVideo = require('../../../../models/EventVideo');

var FacebookPageDataSource = function FacebookPageDataSource(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    this.dataSourceType = this.options.dataSourceType;
    this.eventDataSource = this.options.eventDataSource;
};

FacebookPageDataSource.prototype.fetchData = function () {
    console.log("Start Fetching Data From Facebook Page");
    this.fetchPageDescription();
    this.fetchPagePicture();
    this.fetchPageEvents();
    this.fetchPageFeed();
    this.fetchPagePosts();
    this.fetchPageVideos();
};

FacebookPageDataSource.prototype.fetchPageDescription = function () {
    facebookAPIUtils.getPageDescription(this.eventDataSource.sourceID, function (err, res) {
        console.log("fetched page description");

    });
};

FacebookPageDataSource.prototype.fetchPagePicture = function () {
    facebookAPIUtils.getPagePicture(this.eventDataSource.sourceID, function (err, res) {
        console.log("fetched page picture");

    });
};

FacebookPageDataSource.prototype.fetchPageEvents = function () {
    var self = this;
    facebookAPIUtils.getPageEvents(self.eventDataSource.sourceID, function onGetEvents(err, res) {
        var events = res.data;
        for (var i = 0; i < events.length; i++) {
            var eventPageDataSource = events[i];
            var instance = new EventDataSource();
            instance.source = self.dataSource;
            instance.sourceID = eventPageDataSource.id;
            instance.sourceType = "event";
            instance.event = self.eventDataSource.event;
            instance.save(function (err) {
                if (err) {
                    switch (err.code) {
                        case 11000:
                            // Duplicate entry, TODO Adam: optimize querying from facebook API.
                            break;
                        default:
                            console.error("error saving new event data source e:" + err);
                            break;
                    }
                }
            });
        }
        console.log("fetched page events");

    });


};

FacebookPageDataSource.prototype.fetchPageFeed = function () {
    facebookAPIUtils.getPageFeed(this.eventDataSource.sourceID, function (err, res) {
        console.log("fetched page feed");
    });


};

FacebookPageDataSource.prototype.fetchPagePosts = function () {
    facebookAPIUtils.getPagePosts(this.eventDataSource.sourceID, function (err, res) {
        console.log("fetched page posts");
    });


};

FacebookPageDataSource.prototype.fetchPageVideos = function () {
    var self = this;
    facebookAPIUtils.getPageVideos(this.eventDataSource.sourceID, function (err, res) {
        var videos = res.data;
        if(!err) {
            facebookUtils.handleFetchedVideos(self, videos);
        }else{
            console.error('error in fetchEventVideos. e: ' + err);
        }
    });

};

module.exports = FacebookPageDataSource;