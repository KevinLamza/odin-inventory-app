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

indexRouter.get('/', indexController.getAllItems);
// usersRouter.get('/new', usersController.usersCreateNewGet);
// usersRouter.post('/new', usersController.usersCreateNewPost);
// usersRouter.get('/delete', usersController.usersDeleteAll);

export default indexRouter;
