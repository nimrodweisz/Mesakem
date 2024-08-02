const mongoose = require("mongoose");

const carDataSchema = new mongoose.Schema({
  carNumber: { type: String, unique: true },
  makat: String,
  kshirot: String,
  gdud: String,
});

const CarData = mongoose.model('CarData', carDataSchema);


module.exports = CarData;
