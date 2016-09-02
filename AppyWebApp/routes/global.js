var errorhandler = require('errorhandler');

/**
 * Global routes.  These should be included LAST for wildcard 404 route
 * @param app {object} express application object
 **/
module.exports = function(app) {
    
    // manual 500 error
    app.get('/500', function(req, res) {
        res.send(500, { error: 'Sorry something bad happened!' });
    });  
    
    // wildcard route for 404 errors
    app.get('/*', function(req, res) {
        console.log(req.path);
        res.send(404, { error: 'Sorry Not Found' });
    });
};