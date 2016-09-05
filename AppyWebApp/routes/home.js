var fetchDataUtils = require('../utils/lib/fetchDataUtils');
module.exports = function (app) {

    // home page
    app.get('/', function (req, res) {
        res.render('index', { title: 'Home Page.  ' });
        fetchDataUtils.fetchEventDataFromSources();
    });

};
