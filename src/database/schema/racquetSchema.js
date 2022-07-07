const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//defining schema for mongodb database
const racquetSchema = new Schema(
  {
    racquetType: {
      type: String,
      required: true,
    },
    racquetBrand: {
      type: String,
      required: true,
    },
    dateOfLastRestring: {
      type: String,
      required: true,
    },
    gamesPerWeek: {
      type: String,
      required: true,
    },
    stringType: {
      type: String,
      required: true,
    },
    stringBrand: {
      type: String,
      required: true,
    },
    gauge: {
      type: String,
      required: true,
    },
    tension: {
      type: String,
      required: true,
    },
    racquetId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Racquet = mongoose.model("Racquet", racquetSchema);

module.exports = Racquet;
