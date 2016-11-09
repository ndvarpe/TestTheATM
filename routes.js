var testdata = require('./testdata/atm-data.json');

module.exports = function(app) {
	// api ---------------------------------------------------------------------
	// get atm data
    app.get('/api/getatmdata', function(req, res) {
        res.send(testdata);
    });


	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.sendfile('./src/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};