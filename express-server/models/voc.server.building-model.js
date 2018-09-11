import mongoose from 'mongoose';
mongoose.set('debug', true);

var CalcPointSchema = mongoose.Schema({
// CalcPointSchema.add({
  shortDesc: String,
  longDesc: String,
  // coordinates: String,
  createdAt: {
    type: Date,
    default: Date.now
  },

  results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Results' }],
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GFS'  }]
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
  calcPoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CalcPoint' }],
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GFS'  }]
});

var MeasurementResultsSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },

  usedMetrics: String,
  resultdate: Date,
  parentId: String,

  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GFS'  }]
});



var Building = mongoose.model('Building', BuildingSchema);
var CalcPoint = mongoose.model('CalcPoint', CalcPointSchema);
var Result = mongoose.model('Results', MeasurementResultsSchema);

// Schema for GridFS files
var GFS = mongoose.model("GFS", new mongoose.Schema({
  originalname : String,
  parentId : String,
  fileDesc : String
}, {strict: false}), "fs.files" );

module.exports = {
  CalcPoint,
  Building,
  GFS,
  Result
}