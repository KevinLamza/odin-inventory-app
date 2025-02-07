import { Router } from 'express';
import * as db from '../db/queries.js';

const newRouter = Router();

newRouter.get('/', (req, res) => {
    res.render('form', { title: 'Submit a new message' });
});
newRouter.post('/', async (req, res) => {
    await db.postAddMessage(req.body.message, req.body.name);
    res.redirect('/');
});

export default newRouter;
