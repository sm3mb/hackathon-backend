var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const carsModel = require('../models/carsModel.js');
const app = express();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   // res.send('respond with a resource');
//   // var Cars = mongoose.model('cars-data');
//   // var test = Cars.find();
//   // res.send(test);
//   console.log('This is to get the collections............',mongoose.connection.db.listCollections());
// });

// router.get('/cars', function(req, res, next) {
//   // res.send('respond with a resource');
//   carsModel.find().then(res =>{
//     res.send(res);
//   },err =>{
//     console.log('Error in fetching cars data...',err);
//   })
// });

router.get('/carsdata', async (req, res) => {
  const result = await carsModel.find();

  try {
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/postcar', async (req, res) => {
 
const data = new carsModel({
   color:req.body.color,
   image:req.body.image,
   link:req.body.link,
   location:req.body.location,
   milesDriven:req.body.milesDriven,
   name:req.body.name,
   price:req.body.price,
   zipcode:req.body.zipcode,
   sellerType:req.body.sellerType,
   carType:req.body.carType,
   contactInfo:req.body.contactInfo,
   img1:req.body.img1,
   img2:req.body.img2,
   img3:req.body.img3,
   video:req.body.video
});
  
  data.save();
  res.send('Added!!!!')
});


module.exports = router;
