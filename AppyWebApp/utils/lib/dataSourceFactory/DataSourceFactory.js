/**
 * Created by adam on 03/09/2016.
 */
var FacebookDataSource = require('../dataSourceFactory/facebook');
var DataSourceFactory = function DataSourceFactory(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    switch (this.dataSource) {
        case "facebook":
            this.dataSourceObject = new FacebookDataSource(options);
            break;
    }

};

DataSourceFactory.prototype.fetchData = function () {
    this.dataSourceObject.fetchData();
};

module.exports = {
    createDataSource: function (options) {
        return new DataSourceFactory(options);
    }
};

