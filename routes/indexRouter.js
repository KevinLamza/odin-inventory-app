// import { Router } from 'express';
// import * as db from '../db/queries.js';

// const indexRouter = Router();

// indexRouter.get('/', async (req, res) => {
//     const messages = await db.getAllMessages();
//     res.render('index', { title: 'Mini Message Board', messages: messages });
// });

// export default indexRouter;

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

export default indexRouter;
