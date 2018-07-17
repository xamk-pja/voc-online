import mongoose from 'mongoose';

var Schema = mongoose.Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  todoText: String,

  kuntaText:String,
  buildingType:String,
  // buildingType: {
  //   type: String,
  //   enum : ['Koulu','Toimistorakennus', 'Sote-rakennus', 'Vanhainkoti', 'Kirjasto', 'Asuintalo', 'Muu'],
  //   default: 'Asuintalo'
  // },

  todoDesc: String,

  createdAt:{
    type: Date,
    default: Date.now
  },
  

  calcPoint: [{
      shortDesc: String,
      longDesc: String,
      coordinates: String,
      createdAt:{
        type: Date,
        default: Date.now
      },
      
      measurements: [{
        createdAt:{
          type: Date,
          default: Date.now
        },
        
        usedMetrics: String,
        measuredParams: String
      }]
  }]
});

export default mongoose.model('VOC', Schema);
