var express = require('express');
var router = express.Router();

const request = require("request");
const cheerio = require("cheerio");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  console.log('This is to test......hitting here$$$$$$$$$');
  var defaultUrl = 'https://www.edmunds.com/inventory/srp.html?inventorytype=used%2Ccpo&price=5000-10000';
  //var defaultUrl = 'https://www.indeed.com/jobs?q=full+stack+developer&l=New+York%2C+NY';
  request(defaultUrl,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        var test_html = $(".srp-search-container").html();
        console.log('response@@@@@@@@@@', test_html);

        // var companyList = [];
        // $(".top-paying-companies-list")
        // .find(".ranked-list__item").each((i, el) => {
        //   let companyName = $(el)
        //     .find(".ranked-list__item-title-text")
        //     .text();
        //   let salary = $(el)
        //     .find(".ranked-list__item-subtitle-text")
        //     .text();
        //   let link = $(el)
        //     .find(".ranked-list__icon")
        //     .find("a")
        //     .attr('href');
    
        //   let one = {
        //       companyName: companyName,
        //       salary: salary,
        //       link: link
        //   };

        //   //console.log('each logs###$$$$$$$', one);
        //   companyList.push(one);
        // });

        res.status(200).json(test_html);
      } else {
        res.status(500).json("Error in fetching companies list.");
      }
    }
  );
});


module.exports = router;
