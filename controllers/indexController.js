import { body, query, validationResult } from 'express-validator';
import * as db from '../db/queries.js';

const validateName = [
    body('userName')
        .trim()
        .isAlpha()
        .withMessage('Can only contain letters')
        .isLength({ min: 1, max: 20 })
        .withMessage('Must be between 1 and 20 characters!'),
];

export const getItems = async (req, res) => {
    // console.log(`type query: ${req.query.type}`);
    // console.log(`trainer query: ${req.query.trainers}`);
    // const items =
    //     Object.keys(req.query).length !== 0 && req.query.type !== 'All'
    //         ? await db.getFilteredItems(req.query.type)
    //         : await db.getAllItems();
    let items;
    if (
        Object.keys(req.query).length !== 0 &&
        req.query.type !== 'All' &&
        req.query.trainers !== 'All'
    ) {
        items = await db.getItemsFilteredByTypeAndTrainer(
            req.query.type,
            req.query.trainers,
        );
    } else if (
        Object.keys(req.query).length !== 0 &&
        (req.query.type === 'All' || req.query.type === 'undefined') &&
        req.query.trainers !== 'All'
    ) {
        items = await db.getItemsFilteredByTrainer(req.query.trainers);
    } else if (
        Object.keys(req.query).length !== 0 &&
        req.query.type !== 'All' &&
        (req.query.trainers === 'All' || req.query.trainers === 'undefined')
    ) {
        items = await db.getItemsFilteredByType(req.query.type);
    } else if (
        Object.keys(req.query).length !== 0 &&
        req.query.type === 'All' &&
        req.query.trainers === 'All'
    ) {
        items = await db.getAllItems();
    } else {
        items = await db.getAllItems();
    }
    const types = await db.getAllTypes();
    const trainers = await db.getAllTrainers();
    res.render('index', {
        title: 'Inventory App',
        items: items,
        types: types,
        trainers: trainers,
        typeFilter: req.query.type,
        trainerFilter: req.query.trainers,
    });
};

export const getCreateType = (req, res) => {
    res.render('createType', {
        title: 'Create new type',
    });
};

export const postCreateType = [
    validateName,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('createType', {
                title: 'Create new type',
                errors: errors.array(),
            });
        }
        await db.postCreateType(req.body.name);
        res.redirect('/');
    },
];

export const getCreateTrainer = (req, res) => {
    res.render('createTrainer', {
        title: 'Create new trainer',
    });
};

export const postCreateTrainer = [
    validateName,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('createTrainer', {
                title: 'Create new trainer',
                errors: errors.array(),
            });
        }
        await db.postCreateTrainer(req.body.name);
        res.redirect('/');
    },
];

export const getCreatePokemon = async (req, res) => {
    const types = await db.getAllTypes();
    const trainers = await db.getAllTrainers();
    res.render('createPokemon', {
        title: 'Create new Pokemon',
        trainers: trainers,
        types: types,
    });
};

export const postCreatePokemon = [
    validateName,
    async (req, res) => {
        const types = await db.getAllTypes();
        const trainers = await db.getAllTrainers();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('createPokemon', {
                title: 'Create new Pokemon',
                trainers: trainers,
                types: types,
                errors: errors.array(),
            });
        }
        await db.postCreatePokemon(
            req.body.name,
            req.body.type,
            req.body.trainers,
        );
        res.redirect('/');
    },
];
