import mongoose from 'mongoose';

var CalcPointSchema = mongoose.Schema({
// CalcPointSchema.add({
  shortDesc: String,
  longDesc: String,
  // coordinates: String,
  createdAt: {
    type: Date,
    default: Date.now
  },

  measurements: [{
    createdAt: {
      type: Date,
      default: Date.now
    },

    usedMetrics: String,
    measuredParams: String
  }]
});

var BuildingSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  todoText: String,

  kuntaText: String,
  buildingType: String,
  todoDesc: String,

  createdAt: {
    type: Date,
    default: Date.now
  },
  calcPoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CalcPoint' }]
});

mongoose.set('debug', true);

var Building = mongoose.model('Building', BuildingSchema);
var CalcPoint = mongoose.model('CalcPoint', CalcPointSchema);

module.exports = {
  CalcPoint,
  Building
}