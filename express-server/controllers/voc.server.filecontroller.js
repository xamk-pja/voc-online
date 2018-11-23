/**
 * FileController - handles all files. Uses Multer to read multipart/form-data
 * Multer conf in voc.server.route.js 
 */
var mongo = require('mongodb');
var Grid = require('gridfs-stream');

// create or use an existing mongodb-native db instance
var db = new mongo.Db('vocnew', new mongo.Server("localhost", 27017));
// make sure the db instance is open before passing into `Grid`
var gridfs;
db.open(function (err) {
  if (err) return handleError(err);
  gridfs = Grid(db, mongo);
  // all set!
});

//import models
import { CalcPoint, Building, GFS, Result } from '../models/voc.server.building-model';

/**
 * Upload file - save additional metadata. Original file is already saved in GridFS when this route is called
 * 
 */
export const uploadFile = (req, res) => {

  // File is already saved at this point into Mongo's GridFS - handle additional metadata here. 
  // Get file from Multer's single('file') method, see route.js
  var file = req.file;
  var origname = file.originalname;
  var parentId = req.body.parentId;
  var fileDesc = req.body.fileDesc;

  console.log("file id: " + file.id);
  console.log('File [' + origname + ']: filename: ' + file.filename + ', encoding: ' + file.encoding + ', mimetype: ' + file.mimetype + ', linking to parent: ' + parentId);


  GFS.findOne({ '_id': file.id }, function (err, dbfile) {
    console.log('Setting metadata for uploaded file: ' + file.originalname);
    dbfile.set('originalname', origname);
    dbfile.set('parentId', parentId);
    dbfile.set('fileDesc', fileDesc);
    dbfile.save((err, updatedfile) => {
      if (err) {
        console.log("err: " + err);
        return res.json({ 'success': false, 'message': 'File upload failed, could not modify file metadata' });
      }
      console.log("Metadata added for uploaded file: " + updatedfile);
    });
  });

  Building.findOne({ '_id': parentId }, function (err, building) {
    if (building) {
      console.log("Found a Building object to link the file to: " + parentId);
      updateParentObject(building, file, res);
    }
    // if not found, moving to CalcPoint
    CalcPoint.findOne({ '_id': parentId }, function (err, cp) {
      if (cp) {
        console.log("Found a CalcPoint object to link the file to: " + parentId);
        updateParentObject(cp, file, res);
      }
      // if not found, moving to Result
      Result.findOne({ '_id': parentId }, function (err, result) {
        if (result) {
          console.log("Found an Result object to link the file to: " + parentId);
          updateParentObject(result, file, res);
        }
        if (err) {
          console.log("err: " + err);
        }
      });
      if (err) {
        console.log("err: " + err);
      }
    });
    if (err) {
      console.log("err: " + err);
    }
    //       // TODO: add proper error handling here and for the whole class
    //     }).catch(function (err) { console.log(err); });
    //   });
  });
}

export const updateParentObject = (obj, file, res) => {
  console.log("what are we: " + obj);

  obj.files.push(file.id);

  console.log('Pushing file id: ' + file.id + ' for parent: ' + obj._id);

  obj.save((err, updatedObj) => {
    if (err) {
      console.log("err: " + err);
      return res.json({ 'success': false, 'message': 'File upload failed, could not add parent relation' });
    }
    console.log("File Ref added for object: " + updatedObj._id);


    GFS.findOne({ '_id': file.id }, function (err, newfile) {
      if (err) {
        console.log(err);
      }
      // Return success response 
      return res.json({ 'success': true, 'message': 'Tiedosto lisätty onnistuneesti', newfile, updatedObj });
    });
  });
}

export const updateFile = (req, res) => {
  console.log("PUT /updateFile: going to update file metadata: " + req.body.id);

  GFS.findOne({ '_id': req.body.id }, function (err, dbfile) {
    dbfile.set('fileDesc', req.body.fileDesc);
    dbfile.save((err, fileToEdit) => {
      if (err) {
        console.log("err: " + err);
        return res.json({ 'success': false, 'message': 'File upload failed, could not modify file metadata' });
      }
      console.log("Metadata added for uploaded file: " + fileToEdit);
      return res.json({ 'success': true, 'message': 'Tiedosto päivitettiin', fileToEdit });

    });

  });



}


// TODO: add proper error handling
export const deleteFile = (req, res) => {

  var pid = req.params.parentRefId;

  var objid = req.params.id;

  console.log("obj ref:" + req.params.parentRefId);
  gridfs.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log("Error on deleting file: " + err);
      res.json('Tiedostoa ei voi poistaa...');
    };
    Building.findOneAndUpdate(
      { _id: req.params.parentRefId },
      { $pull: { files: req.params.id } },
      { new: true },
      function (err, removedFromUser) {
        if (err) { console.error(err) }

        console.log("Returning " + objid + " and: " + pid);
        return res.json({ 'success': true, 'message': 'Tiedosto poistettu onnistuneesti.', objid, pid });
      });
  });


  console.log('success');
}

// Building.findByIdAndRemove(req.params.id).populate('files'), function(err, fileref){
//   console.log("fileref found: "+fileref);
//   if (fileref) {
//       GFS.update({_id: fileref._id}, {
//               $pull : {files: req.params.id}
//           }, function(err, data) {
//             console.log("whaat: "+err+ " d: "+data);
//           });
//   }
// });

export const downloadFile = (req, res) => {
  console.log("File download requested for: " + req.params.id);

  // TODO: check req id for undefined
  var file_id = req.params.id;
  var readstream = gridfs.createReadStream({
    _id: req.params.id
  });
  // Manually set original filename for the file to be downloaded
  gridfs.findOne({ _id: file_id }, function (err, file) {
    if (err) {
      res.json(err);
    }
    if (file !== null) {
      console.log("File found, sending response stream to asking party: " + file.originalname);
      var mime = file.contentType;
      var filename = file.originalname;
      res.set('Content-Type', mime);
      res.set('Content-Disposition', "inline; filename=" + filename);
      readstream.pipe(res);
    } else {
      res.json('File Not Found');
    }
  });
}

