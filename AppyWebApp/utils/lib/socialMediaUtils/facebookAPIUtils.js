/**
 * Created by adam on 03/09/2016.
 */
var graph = require('fbgraph')
    , nconf = require('nconf')
    , util = require('util');


var facebookConf = nconf.get('facebook');

var facebookAPIUtils = {
    extendAccessToken: function () {
        // extending static access token
        graph.extendAccessToken({
            "client_id": facebookConf.applicationId
            , "client_secret": facebookConf.applicationSecret
            , "grant_type": "client_credentials"
            , "fb_exchange_token": graph.getAccessToken()
        }, function (err, facebookRes) {
            console.log(facebookRes);
        });
    },
    authenticate: function () {
        graph.authorize({
            "client_id": facebookConf.applicationId
            , "client_secret": facebookConf.applicationSecret
            , "grant_type": "client_credentials"
        }, function (err, facebookRes) {
        });
    },
    getPageDescription: function (pageID, callback) {
        console.log("Start getPageDescription");
        var desc = null;
        var path = pageID;
        var params = {
            fields: "likes" +
            ",were_here_count" +
            ",name" +
            ",location" +
            ",founded" +
            ",general_info" +
            ",featured_video" +
            ",fan_count" +
            ",best_page" +
            ",about" +
            ",can_checkin" +
            ",can_post" +
            ",checkins" +
            ",cover" +
            ",current_location" +
            ",description"
        };
        try {
            graph.get(path, params, callback);
        } catch (e) {
            console.error(util.format('error in getPageVideos, e:%s', e))
        }
        return desc;
    },
    getPagePicture: function (pageID, callback) {
        console.log("Start getPagePicture");
        var picture = null;
        var path = util.format("%s/%s", pageID, "picture");
        var params = {};
        try {
            graph.get(path, params, callback);
        } catch (e) {
            console.error(util.format('error in getPageVideos, e:%s', e))
        }
        return picture;
    },
    getPageEvents: function (pageID, callback) {
        console.log("Start getPageEvents");
        var path = util.format("%s/%s", pageID, "events");
        var params = {fields: "id"};
        try {
            graph.get(path, params, callback);
        } catch (e) {
            console.error(util.format('error in getPageVideos, e:%s', e))
        }
    },
    getPageFeed: function (pageID, callback) {
        console.log("Start getPageEvent");
        var feed = [];
        var path = util.format("%s/%s", pageID, "feed");
        var params = {fields: ""};
        try {
            graph.get(path, params, callback);
        } catch (e) {
            console.error(util.format('error in getPageVideos, e:%s', e))
        }
        return feed;
    },
    getPagePosts: function (pageID, callback) {
        console.log("Start getPagePosts");
        var events = [];
        var path = util.format("%s/%s", pageID, "posts");
        var params = {};
        try {
            graph.get(path, params, callback);
        } catch (e) {
            console.error(util.format('error in getPageVideos, e:%s', e))
        }
        return events;
    },
    getPageVideos: function (pageID, callback) {
        console.log("Start getPageVideos");
        var videos = [];
        var path = util.format("%s/%s", pageID, "videos");
        var params = {
            fields: "embed_html" +
            ",source" +
            ",permalink_url" +
            ",created_time" +
            ",place"
        };
        try {
            graph.get(path, params, callback);
        } catch (e) {
            console.error(util.format('error in getPageVideos, e:%s', e))
        }
        return videos;
    },
    getEventVideos: function (eventID, callback) {
        console.log("Start getEventVideos");
        var videos = [];
        var path = util.format("%s/%s", eventID, "videos");
        var params = {
            fields: "embed_html" +
            ",source" +
            ",created_time"
        };
        try {
            graph.get(path, params, callback);
        } catch (e) {
            console.error(util.format('error in getPageVideos, e:%s', e))
        }
        return videos;
    }

};

facebookAPIUtils.authenticate();

module.exports = facebookAPIUtils;