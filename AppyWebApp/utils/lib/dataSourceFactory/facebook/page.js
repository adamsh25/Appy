/**
 * Created by adam on 06/09/2016.
 */

var facebookUtils = require("../../socialMediaUtils/facebookUtils");

var FacebookPageDataSource  = function FacebookPageDataSource(options) {
    this.options = options;
};

FacebookPageDataSource.prototype.fetchData = function () {
    console.log("Start Fetching Data From Facebook Page");
    fetchPageDescription(this.options.data);
    fetchPagePicture(this.options.data);
    fetchPageEvents(this.options.data);
    fetchPageFeed(this.options.data);
    fetchPagePosts(this.options.data);
    fetchPageVideos(this.options.data);
};

function fetchPageDescription(eventDataSource){
    var pageDescription = facebookUtils.getPageDescription(eventDataSource.sourceID);
    console.log(pageDescription);

}

function fetchPagePicture(eventDataSource){
    var pagePicture = facebookUtils.getPagePicture(eventDataSource.sourceID);
    console.log(pagePicture);

}

function fetchPageEvents(eventDataSource){
    facebookUtils.getPageEvents(eventDataSource.sourceID, function (err, res) {
        console.log(res);
    });


}

function fetchPageFeed(eventDataSource){
    var pageFeed = facebookUtils.getPageFeed(eventDataSource.sourceID);

    console.log(pageFeed);

}

function fetchPagePosts(eventDataSource){
    var pagePosts = facebookUtils.getPagePosts(eventDataSource.sourceID);

    console.log(pagePosts);

}

function fetchPageVideos(eventDataSource){
    var pageVideos = facebookUtils.getPageVideos(eventDataSource.sourceID);


    console.log(pageVideos);

}

module.exports = FacebookPageDataSource;