const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    name: {
      type:     String,
      required: true,
      trim:     true,
    },
    fileName: {
      type:     String,
      required: true,
    },
    columns: {
      type:    [String],
      default: [],
    },
    rowCount: {
      type:    Number,
      default: 0,
    },
    sampleData: {
      type:    Array,
      default: [],
    },
    fullData: {
      type:    Array,
      default: [],
    },
    dataTypes: {
      type:    Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dataset', datasetSchema);