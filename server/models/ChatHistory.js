const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    datasetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'Dataset',
    },
    question:     { type: String, required: true },
    answer:       { type: String, default: '' },
    chartType:    { type: String, default: '' },
    chartData:    { type: Array,  default: [] },
    insightType:  { type: String, default: 'text' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatHistory', chatSchema);