// ./express-server/controllers/voc.server.controller.js
//import models
import { CalcPoint, Building, GFS } from '../models/voc.server.building-model';

export const getBuildings = (req, res) => {
  Building.find().populate('files').exec((err, buildings) => {

    console.log("buildings found: "+buildings);

    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe' });
    }

    return res.json({ 'success': true, 'message': 'Kohteet haettu onnistuneesti', buildings });
  });
}

export const addBuilding = (req, res) => {
  const newBuilding = new Building(req.body);
  newBuilding.save((err, building) => {
    if (err) {
      console.log("err: " + err);

      return res.json({ 'success': false, 'message': 'Virhe' });
    }

    return res.json({ 'success': true, 'message': 'Kohde lisätty onnistuneesti', building });
  })
}

// Add calc point for building
export const addNewCalcPoint = (req, res) => {
  Building.findOne({ '_id': req.body.parent }, function (err, building) {
    if (err) {
      console.log("err: " + err);
      return res.json({ 'success': false, 'message': 'Virhe' });
    }

    const newCalcPoint = new CalcPoint(req.body);
    building.calcPoints.push(newCalcPoint);

    building.save((err, updatedBuilding) => {
      if (err) {
        console.log("err: " + err);
        return res.json({ 'success': false, 'message': 'Virhe' });
      }
      console.log("Building CalcPoint ObjectRef added for CalcPoint: " + newCalcPoint._id);
    });

    newCalcPoint.save((err, cp) => {
      if (err) {
        console.log("err: " + err);
        return res.json({ 'success': false, 'message': 'Virhe' });
      }
      return res.json({ 'success': true, 'message': 'Mittauspaikka lisätty onnistuneesti', newCalcPoint });
    });
  });
}

// Edit calc point for building
export const editCalcPoint = (req, res) => {
  console.log(req.body);

  CalcPoint.findByIdAndUpdate(req.body.id, req.body, { new: true }, function (err, newCalcPoint) {
    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe', 'error': err });
    }

    return res.json({ 'success': true, 'message': 'Päivitettiin onnistuneesti', newCalcPoint });
  });
}

export const deleteCalcPoint = (req, res) => {

  console.log(req.params.id);
  CalcPoint.findByIdAndRemove(req.params.id, (err, calcPoint) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe' });
    }
    console.log("Deletion succesful of mittauspaikka ID: " + req.params.id);
    return res.json({ 'success': true, 'message': 'Mittauspaikka poistettu onnistuneesti.' });
  })
}


export const updateBuilding = (req, res) => {

  console.log(req.body);
  Building.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, building) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe', 'error': err });
    }
    console.log(building);
    return res.json({ 'success': true, 'message': 'Päivitettiin onnistuneesti', building });
  })
}

export const getBuilding = (req, res) => {
  Building.find({ _id: req.params.id }).populate('calcPoints').populate('files').exec((err, building) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe' });
    }

    console.log("it's my building: " + building);

    if (building.length) {
      return res.json({ 'success': true, 'message': 'Rakennus haettu onnistuneesti id:llä', building });
    }
    else {
      return res.json({ 'success': false, 'message': 'Rakennusta ei löytynyt' });
    }
  })
}

export const deleteBuilding = (req, res) => {
  Building.findByIdAndRemove(req.params.id, (err, building) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe' });
    }

    return res.json({ 'success': true, 'message': building.todoText + ' deleted successfully' });
  })
}

