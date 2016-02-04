// #/api/parser
var express = require('express');
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var http = require('http');

var invoiceUrl = 'http://invoice.etax.nat.gov.tw';
var prize = [];
var isGet = false;

/* GET*/
router.get('/', function(req, response, next) {
	// console.log(isGet);
	http.get(invoiceUrl, function(res) {
		var content = '';

      	res.on('data', function (chunk) {
            content += chunk;
        });

        res.on('end', function () {
			$ = cheerio.load(content);
			//...
			var titles = $('.title');
			//Get the period of months
			var date = $('h2').eq(1).text();

			// prize.push({'date': date});

			for (var i = 0; i <= titles.length; i++) {
				//Only excute once
				if(isGet) break;
				var numbers = $(titles).next();

				//Special prize
				if($(titles[i]).text() == '特別獎'){
					prize.push({
						'Title' : $(titles[i]).text(),
						'Number': $(numbers[i]).find('span.t18Red').text(),
						'Des': $(numbers[i]).text().substr(8)
					});
				}
				//Extra prize
				else if($(titles[i]).text() == '特獎'){
					prize.push({
						'Title' : $(titles[i]).text(),
						'Number': $(numbers[i]).find('span.t18Red').text(),
						'Des': $(numbers[i]).text().substr(8)
					});
				}
				//First prize x 3
				else if($(titles[i]).text() == '頭獎'){
					var multiNums = $(numbers[i]).find('span.t18Red').text();
					prize.push({
						'Title' : $(titles[i]).text(),
						'Number': multiNums,
						'Des': $(numbers[i]).text().substr(26)
					});
				}
				//Addtional prize x 3
				else if($(titles[i]).text() == '增開六獎'){
					var multiNums = $(numbers[i]).find('span.t18Red').text();
					prize.push({
						'Title' : $(titles[i]).text(),
						'Number': multiNums,
						'Des': $(numbers[i]).text().substr(11)
					});
					isGet = true;
				}
				//Get else prizes
				else {
					prize.push({
						'Title' : $(titles[i]).text(),
						'Number': '',
						'Des': $(numbers[i]).text()
					});
				}
			}//for
			response.json(prize);
	    }); // on.end

	})
	.on('error', function(e) {
	  console.log("Got error: " + e.message);
	});

});

module.exports = router;