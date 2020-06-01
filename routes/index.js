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
  // var defaultUrl = 'https://www.edmunds.com/inventory/srp.html?inventorytype=used%2Ccpo&price=5000-10000';
  //var defaultUrl = 'https://www.indeed.com/jobs?q=full+stack+developer&l=New+York%2C+NY';
  // var defaultUrl = 'https://www.carmax.com/cars/convertibles';
  var defaultUrl = 'https://www.enterprisecarsales.com/list/buy-a-car/distance=-200';
  // var defaultUrl = 'https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&entitySelectingHelper.selectedEntity=d2396&zip=64112/';

  request(defaultUrl,
    (error, response, html) => {
    //  console.log('result@@@@@@@@',response,error);
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        // var test_html = $(".EUQoKn").html();
        // console.log('response@@@@@@@@@@', test_html);

        var test = [];
        $(".bg-white.ma2.rw-1-over-3-w2.flex").each((i, el) => {
          let jobTitle = $(el)
            .find(".vehicle")
            .find(".theme-primary-hover.underline-hover.pointer.w-100.fl")
            .text();
            // .replace(/\s\s+/g, "");
          let milesDriven = $(el)
            .find(".dib.mr1")
            // .find("b")
            .text();
            // .trim();
          let price = $(el)
            .find(".pricing_value_3.b")
            .text();
            // .trim();
          let color = $(el)
            .find(".truncate.f7")
            .find(".b")
            .text();
          let location = $(el)
            .find(".b.notranslate")
            .text();
            // .trim();
          // .replace(/\s\s+/g, '');
          let image = $(el)
            .find(".vehicle")
            .find("img")
            .attr("src");
          let link = $(el)
            .find(".vehicle")
            .find("a")
            .attr('href');
          let linkPrefix = 'https://www.enterprisecarsales.com' + link;
          // console.log('link prefix@@@@@@@@@', linkPrefix); viewJobButtonLinkContainer
          // if(jobTitle == 'Software Engineer' && companyName == 'Capital One') {
          //   console.log('link prefix@@@@@@@@@', applyLink);
          // }
          // if(applyLink == null || applyLink == undefined){
          //   applyLink = linkPrefix;
          // }
          let one = {
            name: jobTitle,
            link: linkPrefix,
            image: image,
            color: color,
            location: location,
            price: price,
            milesDriven: milesDriven
          };
          test.push(one);
        });

        res.status(200).json(test);
      } else {
        res.status(500).json("Error in fetching cars list.");
      }
    }
  );
});


module.exports = router;
