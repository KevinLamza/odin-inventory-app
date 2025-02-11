import { body, query, validationResult } from 'express-validator';
import * as db from '../db/queries.js';

const validateName = [
    body('*')
        .trim()
        .isAlpha()
        .withMessage('Can only contain letters')
        .isLength({ min: 1, max: 20 })
        .withMessage('Must be between 1 and 20 characters!'),
];

export const getItems = async (req, res) => {
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
    const filteredTypes = types.filter(
        (type) => type.id !== 0 && type.name !== 'Unknown',
    );
    const trainers = await db.getAllTrainers();
    const filteredTrainers = trainers.filter(
        (trainer) => trainer.id !== 0 && trainer.name !== 'Unknown',
    );
    res.render('index', {
        title: 'Inventory App',
        items: items,
        types: filteredTypes,
        trainers: filteredTrainers,
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
    const filteredTypes = types.filter(
        (type) => type.id !== 0 && type.name !== 'Unknown',
    );
    const trainers = await db.getAllTrainers();
    const filteredTrainers = trainers.filter(
        (trainer) => trainer.id !== 0 && trainer.name !== 'Unknown',
    );
    res.render('createPokemon', {
        title: 'Create new Pokemon',
        trainers: filteredTrainers,
        types: filteredTypes,
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

export const getUpdateTypes = async (req, res) => {
    const types = await db.getAllTypes();
    const filteredTypes = types.filter(
        (type) => type.id !== 0 && type.name !== 'Unknown',
    );
    res.render('updateTypes', {
        title: 'Update types',
        types: filteredTypes,
    });
};

export const postUpdateTypes = [
    validateName,
    async (req, res) => {
        const types = await db.getAllTypes();
        const filteredTypes = types.filter(
            (type) => type.id !== 0 && type.name !== 'Unknown',
        );
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('createPokemon', {
                title: 'Update types',
                types: filteredTypes,
                errors: errors.array(),
            });
        }
        // It's an object, with the key being the name of the form field and the value the value of the input
        for (let prop in req.body) {
            if (!req.body.hasOwnProperty(prop)) {
                continue;
            }
            if (req.body[prop] !== prop) {
                await db.postUpdateType(prop, req.body[prop]);
            }
        }
        res.redirect('/');
    },
];

export const getUpdateTrainer = async (req, res) => {
    const trainers = await db.getAllTrainers();
    const filteredTrainers = trainers.filter(
        (trainer) => trainer.id !== 0 && trainer.name !== 'Unknown',
    );
    res.render('updateTrainer', {
        title: 'Update trainer',
        trainers: filteredTrainers,
    });
};

export const postUpdateTrainer = [
    validateName,
    async (req, res) => {
        const trainers = await db.getAllTrainers();
        const filteredTrainers = trainers.filter(
            (trainer) => trainer.id !== 0 && trainer.name !== 'Unknown',
        );
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('createPokemon', {
                title: 'Update trainers',
                trainers: filteredTrainers,
                errors: errors.array(),
            });
        }
        // It's an object, with the key being the name of the form field and the value the value of the input
        for (let prop in req.body) {
            if (!req.body.hasOwnProperty(prop)) {
                continue;
            }
            if (req.body[prop] !== prop) {
                await db.postUpdateTrainer(prop, req.body[prop]);
            }
        }
        res.redirect('/');
    },
];

export const getUpdatePokemon = async (req, res) => {
    const items = await db.getAllItems();
    const types = await db.getAllTypes();
    const filteredTypes = types.filter(
        (type) => type.id !== 0 && type.name !== 'Unknown',
    );
    const trainers = await db.getAllTrainers();
    const filteredTrainers = trainers.filter(
        (trainer) => trainer.id !== 0 && trainer.name !== 'Unknown',
    );
    res.render('updatePokemon', {
        title: 'Update Pokemon',
        items: items,
        types: filteredTypes,
        trainers: filteredTrainers,
    });
};

export const postUpdatePokemon = [
    validateName,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('createPokemon', {
                title: 'Update types',
                types: types,
                errors: errors.array(),
            });
        }
        for (let prop in req.body) {
            if (!req.body.hasOwnProperty(prop)) {
                continue;
            }
            const split = prop.split('_');
            if (req.body[prop] !== split[2]) {
                if (split[0] === 'Name') {
                    await db.postUpdatePokemonName(split[1], req.body[prop]);
                } else if (split[0] === 'Type') {
                    const newTypeId = await db.getTypeId(req.body[prop]);
                    await db.postUpdatePokemonType(split[1], newTypeId[0].id);
                } else if (split[0] === 'Trainer') {
                    const newTrainerId = await db.getTrainerId(req.body[prop]);
                    await db.postUpdatePokemonTrainer(
                        split[1],
                        newTrainerId[0].id,
                    );
                }
            }
        }
        res.redirect('/');
    },
];

export const getDeleteTypes = async (req, res) => {
    const types = await db.getAllTypes();
    const filteredTypes = types.filter(
        (type) => type.id !== 0 && type.name !== 'Unknown',
    );
    res.render('deleteTypes', {
        title: 'Delete types',
        types: filteredTypes,
    });
};

export const postDeleteTypes = async (req, res) => {
    for (let prop in req.body) {
        if (!req.body.hasOwnProperty(prop)) {
            continue;
        }
        await db.postDeleteType(prop);
    }
    res.redirect('/');
};

export const getDeleteTrainer = async (req, res) => {
    const trainers = await db.getAllTrainers();
    const filteredTrainers = trainers.filter(
        (trainer) => trainer.id !== 0 && trainer.name !== 'Unknown',
    );
    res.render('deleteTrainer', {
        title: 'Delete trainer',
        trainers: filteredTrainers,
    });
};

export const postDeleteTrainer = async (req, res) => {
    for (let prop in req.body) {
        if (!req.body.hasOwnProperty(prop)) {
            continue;
        }
        await db.postDeleteTrainer(prop);
    }
    res.redirect('/');
};

export const getDeletePokemon = async (req, res) => {
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
    const filteredTypes = types.filter(
        (type) => type.id !== 0 && type.name !== 'Unknown',
    );
    const trainers = await db.getAllTrainers();
    const filteredTrainers = trainers.filter(
        (trainer) => trainer.id !== 0 && trainer.name !== 'Unknown',
    );
    res.render('deletePokemon', {
        title: 'Delete Pokemon',
        items: items,
        types: filteredTypes,
        trainers: filteredTrainers,
        typeFilter: req.query.type,
        trainerFilter: req.query.trainers,
    });
};

export const postDeletePokemon = async (req, res) => {
    for (let prop in req.body) {
        if (!req.body.hasOwnProperty(prop)) {
            continue;
        }
        await db.postDeletePokemon(prop);
    }
    res.redirect('/');
};
