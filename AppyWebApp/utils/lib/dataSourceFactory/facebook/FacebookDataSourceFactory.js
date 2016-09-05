/**
 * Created by adam on 06/09/2016.
 */
var FacebookPageDataSource = require('../facebook/page');
var FacebookDataSourceFactory = function FacebookDataSourceFactory(options) {
    this.dataSourceType = options.dataSourceType;
    switch (this.dataSourceType) {
        case "page":
            this.dataSourceObject = new FacebookPageDataSource(options);
            break;
    }

};

FacebookDataSourceFactory.prototype.fetchData = function () {
    this.dataSourceObject.fetchData();
};

module.exports = {
    createDataSource: function (options) {
        return new FacebookDataSourceFactory(options);
    }
};

