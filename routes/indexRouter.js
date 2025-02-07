import { Router } from 'express';
import * as db from '../db/queries.js';

const indexRouter = Router();
console.log('hello');

indexRouter.get('/', async (req, res) => {
    const messages = await db.getAllMessages();
    res.render('index', { title: 'Mini Message Board', messages: messages });
});

export default indexRouter;
