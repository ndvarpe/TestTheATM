var testatmdata = require('./testdata/atm-data.json');
var testadmindata = require('./testdata/login-data.json');
var fs = require('fs');

module.exports = function(app) {
	// api ---------------------------------------------------------------------
    // get atm data

    app.get('/api/atm', function (req, res) {
        res.send(testatmdata);
    });

    app.post('/api/atm', function (req, res) {
        var tempData = testatmdata;
        var tempDetails = undefined;
        for (var i = 0; i < tempData.length; i++) {
            if (tempData[i].account_number == req.body.account_number) {
                tempDetails = req.body;
                tempData.splice(i, 1);
                tempData.push(tempDetails);
                writeToFile(tempData);
            }
        }
        res.send('Success');
    });

    app.get('/api/getatmdata', function (req, res) {
        res.send(testatmdata);
    });

    //get account
    app.get('/api/getaccount', function (req, res) {
        var data = undefined;
        for (var i = 0; i < testatmdata.length; i++) {
            if (testatmdata[i].account_number == req.query.account_number) {
                data = testatmdata[i];
            }
        }
        if (data) {
            res.send(data);
        }
        else {
            res.send('No account found');
        }
    });

    //create account
    app.post('/api/createaccount', function (req, res) {
        var tempData = testatmdata;
        var tempDetails = undefined;
        for (var i = 0; i < tempData.length; i++) {
            if (tempData[i].account_number == req.body.account_number ||
                tempData[i].card_number == req.body.card_number ||
                tempData[i].user_name == req.body.user_name) {
                tempDetails = req.body;
            }
        }
        if (tempDetails) {
            res.send('Exists');
        }
        else {
            tempData.push(req.body);
            writeToFile(tempData);
            res.send('Success');
        }
        
    });

    //update account details
    app.post('/api/updateaccount', function (req, res) {
        var tempData = testatmdata;
        var tempDetails = undefined;
        for (var i = 0; i < tempData.length; i++) {
            if (tempData[i].account_number == req.body.account_number) {
                tempDetails = req.body;
                tempData.splice(i, 1);
                tempData.push(tempDetails);
                writeToFile(tempData);
            }
        }
        res.send('Success');
    });

    //delete account
    app.get('/api/deleteaccount', function (req, res) {
        var tempData = testatmdata;
        for (var i = 0; i < tempData.length; i++) {
            if (tempData[i].account_number == req.query.account_number) {
                tempData.splice(i, 1);
                writeToFile(tempData);
            }
        }
        res.send(tempData);
    });

    app.get('/api/getadmin', function (req, res) {
        var data = undefined;
        for (var i = 0; i < testadmindata.length; i++) {
            if (testadmindata[i].user_name == req.query.username
                && testadmindata[i].password == req.query.password) {
                data = testadmindata[i];
            }
        }
        if (data) {
            res.send(data);
        }
        else{
            res.send('Invalid login');
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