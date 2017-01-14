/**
 * Created by adam on 03/09/2016.
 */
var FacebookDataSourceFactory = require('../dataSourceFactory/facebook/FacebookDataSourceFactory');
var FacebookDataSource  = function FacebookDataSource(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    this.eventDataSource = this.options.eventDataSource;
    this.dataSourceType = this.eventDataSource.sourceType;
};

FacebookDataSource.prototype.fetchData = function () {
    console.log("Start Fetching Data From Facebook");
    var options = {
        dataSource: this.dataSource,
        dataSourceType: this.dataSourceType,
        eventDataSource: this.eventDataSource
    };
    var dataSource = FacebookDataSourceFactory.createDataSource(options);
    if(dataSource) {
        dataSource.fetchData();
    }else{
        console.error('no factory object for type:' + this.dataSourceType);
    }

};

module.exports = FacebookDataSource;