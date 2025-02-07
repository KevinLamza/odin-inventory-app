import { body, query, validationResult } from 'express-validator';
import * as db from '../db/queries.js';

// const validateUser = [
//     body('userName')
//         .trim()
//         .isAlphanumeric()
//         .withMessage('Can only contain letters or numbers!')
//         .isLength({ min: 1, max: 20 })
//         .withMessage('Must be between 1 and 20 characters!'),
// ];

export const getItems = async (req, res) => {
    console.log(`search query: ${req.query.type}`);
    const items =
        Object.keys(req.query).length !== 0 && req.query.type !== 'All'
            ? await db.getFilteredItems(req.query.type)
            : await db.getAllItems();
    const types = await db.getAllTypes();
    res.render('index', {
        title: 'Inventory App',
        items: items,
        types: types,
        filter: req.query.type,
    });
};

// export const usersCreateNewGet = (req, res) => {
//     res.render('new', {
//         title: 'Create user',
//     });
// };

// export const usersCreateNewPost = [
//     validateUser,
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).render('new', {
//                 title: 'Create user',
//                 errors: errors.array(),
//             });
//         }
//         // console.log('username to be saved: ', req.body.userName);
//         const userName = req.body.userName;
//         await db.insertUsername(userName);
//         res.redirect('/');
//     },
// ];

// export const usersDeleteAll = async (req, res) => {
//     await db.postDeleteUsers();
//     res.redirect('/');
// };
