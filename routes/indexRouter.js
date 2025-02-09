import { Router } from 'express';
import * as indexController from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', indexController.getItems);

indexRouter.get('/createType', indexController.getCreateType);
indexRouter.post('/createType', indexController.postCreateType);
indexRouter.get('/createTrainer', indexController.getCreateTrainer);
indexRouter.post('/createTrainer', indexController.postCreateTrainer);
indexRouter.get('/createPokemon', indexController.getCreatePokemon);
indexRouter.post('/createPokemon', indexController.postCreatePokemon);

indexRouter.get('/updateTypes', indexController.getUpdateTypes);
indexRouter.post('/updateTypes', indexController.postUpdateTypes);
indexRouter.get('/updateTrainer', indexController.getUpdateTrainer);
indexRouter.post('/updateTrainer', indexController.postUpdateTrainer);
indexRouter.get('/updatePokemon', indexController.getUpdatePokemon);
indexRouter.post('/updatePokemon', indexController.postUpdatePokemon);

indexRouter.get('/deleteTypes', indexController.getDeleteTypes);
indexRouter.post('/deleteTypes', indexController.postDeleteTypes);
indexRouter.get('/deleteTrainer', indexController.getDeleteTrainer);
indexRouter.post('/deleteTrainer', indexController.postDeleteTrainer);

export default indexRouter;
