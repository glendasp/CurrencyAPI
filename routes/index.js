var express = require("express");
var router = express.Router();


var request = require('request'); // tell the program to to send a request to the API.
//var moment = require('moment');

var baseURL = 'http://api.fixer.io/latest?base=USD&symbols=GBP,BRL';


var exchangeRateGBP = 0 ;
var exchangeRateBRL = 0 ;

/* GET home page. */
router.get('/', homepage);



function homepage(req, res) {
  res.render("index");
}

/* GET request , for form submit */
router.get('/convert', convert);


function convert(req, res) {

    //Data send as a post request is available in the
    //body.query attribute; properties same as name in form

    var userAmount = req.query.fromamount;
    var convertFrom = req.query.fromcurrency;
    var convertTo = req.query.tocurrency;
    console.log("query was: convert " + userAmount + " to " + convertTo);

    //Our conversion rates -

    request(baseURL, function (error, response, body) {
        var convJSON = JSON.parse(body);
        console.log(convJSON);
        var conversionRate = convJSON.rates[convertTo];
        exchangeRateGBP = convJSON.rates.GBP;
        console.log("British Pound -  " + exchangeRateGBP);
        exchangeRateBRL = convJSON.rates.BRL;
        console.log("Brazilian Real - " + exchangeRateBRL);

        var conversion = {"GBP": exchangeRateGBP, "BRL": exchangeRateBRL};

        //var baseUSD = money / conversion[convertFrom];
        // var conversionRate = conversion[convertTo];

        var convertedVal = conversionRate * userAmount;

        res.render('result', {
            startmoney: userAmount,
            startcurrency: convertFrom,
            currency: convertTo,
            converted: convertedVal
        });

    });
}

module.exports = router;
