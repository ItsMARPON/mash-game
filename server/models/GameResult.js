const { Schema, model } = require("mongoose");

const gameResultSchema = new Schema({
  mash: {
    type: String,
    required: true,
    trim: true,
  },
  partner: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    trim: true,
  },
  kids: {
    type: BigInt,
    required: true,
    trim: true,
    min: 0,
    max: 100000
  },
  career: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    trim: true,
    min: -10000000,
    max: 10000000000000
  },
  transportation: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    trim: true,
  },
  death: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  deathAge: {
    type: BigInt,
    required: true,
    trim: true,
    min: 0,
    max: 100000
  },
});

module.exports = gameResultSchema;
