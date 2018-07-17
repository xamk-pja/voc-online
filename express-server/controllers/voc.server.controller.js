// ./express-server/controllers/voc.server.controller.js
import mongoose from 'mongoose';

//import models
import VOC from '../models/voc.server.model';

export const getBuildings = (req,res) => {
  VOC.find().exec((err,buildings) => {
    if(err){
    return res.json({'success':false,'message':'Virhe'});
    }

    return res.json({'success':true,'message':'Kohteet haettu onnistuneesti',buildings});
  });
}

export const addBuilding = (req,res) => {
  console.log(req.body);
  const newBuilding = new VOC(req.body);
  newBuilding.save((err,building) => {
    if(err){
      console.log("err: " +err);

    return res.json({'success':false,'message':'Virhe'});
    }

    return res.json({'success':true,'message':'Kohde lisätty onnistuneesti',building});
  })
}

// Add calc point for building
export const addNewCalcPoint = (req,res) => {
  console.log("CPPP: "+req.body.parent);

  console.log(req.body);
  VOC.update({'_id':req.body.parent}, {'$push' : { calcPoint: {
    'shortDesc':req.body.shortDesc,
    'longDesc':req.body.longDesc
  }}}, function(err, calcPoint) {
    if (err) {
      console.log(err);
      return res.json({'success':false,'message':'Virhe'});
    }
    
    return res.json({'success':true,'message':'Kohde lisätty onnistuneesti',calcPoint});
  });
}

//   VOC.findOneAndUpdate({ _id:req.body.parent }, req.body, { new:true }, (err,calcPoint) => {
//     console.log("CPPP: "+calcPoint);

//     if(err){
//     return res.json({'success':false,'message':'Virhe','error':err});
//     }
//     return res.json({'success':true,'message':'Päivitettiin onnistuneesti',calcPoint});
//   })
// }

export const updateBuilding = (req,res) => {
  VOC.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,building) => {
    if(err){
    return res.json({'success':false,'message':'Virhe','error':err});
    }
    console.log(building);
    return res.json({'success':true,'message':'Päivitettiin onnistuneesti',building});
  })
}

export const getBuilding = (req,res) => {
  VOC.find({_id:req.params.id}).exec((err,building) => {
    if(err){
    return res.json({'success':false,'message':'Virhe'});
    }
    if(building.length){
      return res.json({'success':true,'message':'Rakennus haettu onnistuneesti id:llä',building});
    }
    else{
      return res.json({'success':false,'message':'Rakennusta ei löytynyt'});
    }
  })
}

export const deleteBuilding = (req,res) => {
  VOC.findByIdAndRemove(req.params.id, (err,building) => {
    if(err){
    return res.json({'success':false,'message':'Virhe'});
    }

    return res.json({'success':true,'message':building.todoText+' deleted successfully'});
  })
}
