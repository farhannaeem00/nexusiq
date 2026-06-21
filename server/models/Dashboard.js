const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  type:      { type: String, enum: ['chart', 'metric', 'table'] },
  title:     String,
  chartType: { type: String, enum: ['bar', 'line', 'pie', 'area'] },
  question:  String,
  data:      Array,
  x:         { type: Number, default: 0 },
  y:         { type: Number, default: 0 },
  w:         { type: Number, default: 6 },
  h:         { type: Number, default: 4 },
});

const dashboardSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    name:    { type: String, required: true, trim: true },
    widgets: [widgetSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dashboard', dashboardSchema);