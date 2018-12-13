// ./express-server/controllers/voc.server.controller.js
//import models
import { CalcPoint, Building, GFS } from '../models/voc.server.building-model';

import { dynamicSort } from '../utils/utils.js';
export const getBuildings = (req, res) => {
  if (req.body.groups) {
    var userGroups = JSON.parse(req.body.groups);
    Building.find(getQuery(userGroups)).populate('files').exec((err, buildings) => {
      if (err) {
        return res.json({ 'success': false, 'message': 'Virhe' });
      }
      buildings.sort(dynamicSort("buildingName", "asc"));
      return res.json({ 'success': true, 'message': 'Kohteet haettu onnistuneesti', buildings });
    });
  } else {
    return res.json({ 'error': true, 'message': 'Käyttäjä ei kuulu yhteenkään ryhmään, ei voida näyttää rakennuksia' });
  }
}

// Dynamic OR query for matching user's groups
function getQuery(userGroups) {
  var query = { $or: [] };
  if (userGroups && Array.isArray(userGroups)) {
    for (var gr in userGroups) {
      query.$or.push({ "dataOwner": userGroups[gr] });
    }
  } else {
    console.log("WARN: user doesn't belong to any group!");
  }
  return query;
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
  CalcPoint.findByIdAndUpdate(req.body.id, req.body, { new: true }, function (err, newCalcPoint) {
    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe', 'error': err });
    }

    return res.json({ 'success': true, 'message': 'Päivitettiin onnistuneesti', newCalcPoint });
  });
}

export const deleteCalcPoint = (req, res) => {
  CalcPoint.findByIdAndRemove(req.params.id, (err, calcPoint) => {
    if ( calcPoint.results ) {
      calcPoint.results.forEach(function(result) {
        console.log("Deleting all files linked to result: "+result._id+", as the parent calc point is marked to be deleted.");
        deleteLinkedFiles(result._id);
      });
    }
    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe' });
    }
    console.log("Deletion succesful of mittauspaikka ID: " + req.params.id);
    return res.json({ 'success': true, 'message': 'Mittauspaikka poistettu onnistuneesti.' });
  })
}


export const updateBuilding = (req, res) => {
  Building.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }).populate('files').exec((err, building) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe', 'error': err });
    }
    return res.json({ 'success': true, 'message': 'Päivitettiin onnistuneesti', building });
  })
}

export const getBuilding = (req, res) => {
  Building.find({ _id: req.params.id }).populate('calcPoints').populate('files').exec((err, building) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe' });
    }

    if (building.length) {
      return res.json({ 'success': true, 'message': 'Rakennus haettu onnistuneesti id:llä', building });
    }
    else {
      return res.json({ 'success': false, 'message': 'Rakennusta ei löytynyt' });
    }
  })
}

export const deleteBuilding = (req, res) => {

  // delete linked files from building
  deleteLinkedFiles(req.params.id);

  // delete linked files from buildings calcpoint results
  Building.find({ _id: req.params.id }).populate('calcPoints').populate('files').exec((err, building) => {
    if ( building[0].calcPoints ) {
      building[0].calcPoints.forEach(function(calcPoint){
        if ( calcPoint.results ) {
          calcPoint.results.forEach(function(result) {
            console.log("Deleting all files linked to result: "+result._id+", as the parent building is marked to be deleted.");
            deleteLinkedFiles(result._id);
          });
        }
      });
    } 
  });

  Building.findByIdAndRemove(req.params.id, (err, building) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Virhe' });
    }
    return res.json({ 'success': true, 'message': building.buildingName + ' deleted successfully' });
  })
}

export async function deleteLinkedFiles(id) {
  const { mongoose, gfs } = await require("../utils/mongoose");

  GFS.find({ parentId: id }, function (err, files) {
    if (err) {
      console.log("File not found: " + err);
    } else {
      for (var i = 0; i < files.length; i++) {
        var fid = files[i]._id;
        gfs.remove({ _id: fid }, function (err) {
          if (err) {
            console.log("Error on deleting file (should be removed by hand, it's now a blank node in MongoDB GridFS): " + err);
          };
          console.log("File: " + fid + " referencing object: " + id + " is removed.");
        });
      }
    }
  });
}
