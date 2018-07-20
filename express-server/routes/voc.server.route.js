// ./express-server/routes/voc.server.route.js
import express from 'express';

//import controller file
import * as vocController from '../controllers/voc.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/')
     .get(vocController.getBuildings)
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


export default router;
