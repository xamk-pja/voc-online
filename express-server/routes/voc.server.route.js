// ./express-server/routes/voc.server.route.js
import express from 'express';

//import controller file
import * as vocController from '../controllers/voc.server.controller';
import * as fileController from '../controllers/voc.server.filecontroller';
import * as resultsController from '../controllers/voc.server.resultscontroller';

// get an instance of express router
const router = express.Router();

var multer  = require('multer');

// Create a storage object with a given configuration
const storage = require('multer-gridfs-storage')({
      url: 'mongodb://localhost:27017/vocnew'
});

// Set multer storage engine to the newly created object
const uploadGrid = multer({ storage: storage });

// Multer .single() needs to be changed if you want to allow multi-uploads for routes defined in router
router.use(uploadGrid.single('file'));

router.route('/fetch')
      .post(vocController.getBuildings);

router.route('/')
     .post(vocController.addBuilding)
     .put(vocController.updateBuilding);

router.route('/:id')
      .get(vocController.getBuilding)
      .delete(vocController.deleteBuilding);

router.route('/cp/')
      .put(vocController.editCalcPoint)

router.route('/cp/:id')
      .post(vocController.addNewCalcPoint)
      .delete(vocController.deleteCalcPoint);

router.route('/files/')
      .post(fileController.uploadFile)
      .put(fileController.updateFile)
      
router.route('/files/:id')
      .get(fileController.downloadFile)

router.route('/files/:id/:parentRefId')
      .delete(fileController.deleteFile);

router.route('/results/:id')
      .get(resultsController.getResultsForCalcPoint)
      .delete(resultsController.deleteResult);

router.route('/results')
      .put(resultsController.editResult)
      .post(resultsController.addMeasurementResult);
      


export default router;
