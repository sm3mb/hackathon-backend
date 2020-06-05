const mongoose = require('mongoose');

const CarsSchema = new mongoose.Schema({
  color: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String
  },
  location: {
    type: String,
  },
  milesDriven: {
    type: String,
  },
  name: {
    type: String
  },
  price: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  sellerType: {
    type: String
  },
  carType: {
    type: String,
  },
  contactInfo: {
    type: String,
  },
  img1: {
    type: String
  },
  img2: {
    type: String,
  },
  img3: {
    type: String
  },
  video: {
    type: String
  },
});

const CarSchema = mongoose.model("used-cars-data", CarsSchema);
module.exports = CarSchema;