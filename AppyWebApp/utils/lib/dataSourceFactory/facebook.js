/**
 * Created by adam on 03/09/2016.
 */
var FacebookDataSourceFactory = require('../dataSourceFactory/facebook/FacebookDataSourceFactory');
var FacebookDataSource  = function FacebookDataSource(options) {
    this.options = options;
};

FacebookDataSource.prototype.fetchData = function () {
    console.log("Start Fetching Data From Facebook");
    var dataSource = FacebookDataSourceFactory.createDataSource({
        dataSourceType: this.options.data.sourceType,
        data: this.options.data
    });
    dataSource.fetchData();

};

module.exports = FacebookDataSource;