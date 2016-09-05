/**
 * Created by adam on 03/09/2016.
 */
var EventDataSource = require('../../models/EventDataSource');
var DataSourceFactory = require('../lib/dataSourceFactory/DataSourceFactory');
module.exports = {
    fetchEventDataFromSources: function () {
        console.log("Start Fetching Data From Data Sources");
        // run through all event data sources
        // foreach data source call the correct source method
        EventDataSource.find({}, function (err, eventsDataSources) {
            if (err) {
                console.error("error getting eventDataSources, e:" + err);
                return;
            }

            for (var i = 0; i < eventsDataSources.length; i++) {
                var eventDataSource = eventsDataSources[i];
                var dataSource = DataSourceFactory.createDataSource({
                    dataSource: eventDataSource.source,
                    data: eventDataSource
                });
                dataSource.fetchData();
            }

        });


    }

};