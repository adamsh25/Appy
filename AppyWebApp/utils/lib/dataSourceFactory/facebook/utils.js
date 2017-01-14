/**
 * Created by adam on 10/09/2016.
 */

var EventDataSource = require('../../../../models/EventDataSource')
    , EventVideo = require('../../../../models/EventVideo');


var facebookUtils = {
    handleFetchedVideos: function (source, videos) {
        for (var i = 0; i < videos.length; i++) {
            var eventPageVideo = videos[i];
            var instance = new EventVideo();
            instance.sourceVideoID = eventPageVideo.id;
            instance.sourceVideoCreatedDate = eventPageVideo.created_time;
            instance.videoURL = eventPageVideo.source;
            instance.htmlToEmbed = eventPageVideo.embed_html;
            instance.eventDataSource = source.eventDataSource;
            instance.event = source.eventDataSource.event;
            instance.save(function (err) {
                if (err) {
                    switch (err.code) {
                        case 11000:
                            // Duplicate entry, TODO Adam: optimize querying from facebook API.
                            break;
                        default:
                            console.error("error saving new video e:" + err);
                            break;
                    }
                }
            });
        }
        console.log("fetched page videos");
    }
};


module.exports = facebookUtils;