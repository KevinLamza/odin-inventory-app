import 'dotenv/config';
import express from 'express';
import path from 'path';
import indexRouter from './routes/indexRouter.js';
import newRouter from './routes/newRouter.js';

const __dirname = new URL('.', import.meta.url).pathname;

const app = express();

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server up and running - listening on port ${PORT}`);
});

app.use('/', indexRouter);
app.use('/new', newRouter);
