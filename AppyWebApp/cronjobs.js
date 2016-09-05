/**
 * Created by adam on 03/09/2016.
 */
var cron = require('cron')
    , fetchDataUtils = require('/utils/lib/fetchDataUtils');
var CronJob = cron.CronJob;

new CronJob('* * * * * *', function () {
    console.log('Start fetchEventDataFromSources');
    fetchDataUtils.fetchEventDataFromSources();
    console.log('End fetchEventDataFromSources');
}, null, true, 'America/Los_Angeles');