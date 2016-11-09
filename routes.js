var testdata = require('./testdata/atm-data.json');
var fs = require('fs');

module.exports = function(app) {
	// api ---------------------------------------------------------------------
	// get atm data
    app.get('/api/getatmdata', function (req, res) {
        res.send(testdata);
    });

    //update account details and send back all details
    app.post('/api/updatedetails', function (req, res) {
        var tempData = testdata;
        var tempDetails = undefined;
        for (var i = 0; i < tempData.length; i++) {
            if (tempData[i].account_number == req.body.account_number) {
                tempDetails = req.body;
                tempData.splice(i, 1);
                tempData.push(tempDetails);
                writeToFile(tempData);
            }
        }
    });


    function writeToFile(data) {
        fs.writeFile('./testdata/atm-data.json', JSON.stringify(data), 'utf8');
    }

	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.sendfile('./src/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};