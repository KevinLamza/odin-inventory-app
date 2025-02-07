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

export const getAllItems = async (req, res) => {
    const items = await db.getAllItems();
    // res.send('Usernames: ' + usernames.map((user) => user.username).join(', '));
    // console.log('Usernames: ', usernames);
    res.render('index', { title: 'Inventory App', items: items });
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
