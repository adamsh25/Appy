/**
 * Created by adam on 06/09/2016.
 */
var FacebookPageDataSource = require('../facebook/page')
    , FacebookEventDataSource = require('../facebook/event');
var FacebookDataSourceFactory = function FacebookDataSourceFactory(options) {
    this.options = options;
    this.dataSourceType = this.options.dataSourceType;
    this.eventDataSource = this.options.eventDataSource;
    switch (this.dataSourceType) {
        case "page":
            this.dataSourceObject = new FacebookPageDataSource(options);
            break
        case "event":
            this.dataSourceObject = new FacebookEventDataSource(options);
            break;
    }

};

FacebookDataSourceFactory.prototype.fetchData = function () {
    if(this.dataSourceObject) {
        this.dataSourceObject.fetchData();
    }else{
        console.error('no factory object for ' + this.dataSourceType);
    }
};

module.exports = {
    createDataSource: function (options) {
        return new FacebookDataSourceFactory(options);
    }
};

