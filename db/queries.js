import pool from './pool.js';

export async function getAllItems() {
    // const { rows } = await pool.query('SELECT * FROM pokemon');
    const { rows } = await pool.query(
        `SELECT 
            pokemon.id, 
            pokemon.name AS pokemon_name, 
            type.name AS type_name, 
            trainer.name AS trainer_name 
        FROM pokemon 
        LEFT JOIN type 
            ON pokemon.type = type.id 
        LEFT JOIN trainer 
            ON pokemon.trainer = trainer.id;`,
    );
    return rows;
}

export async function getItemsFilteredByType(string) {
    const { rows } = await pool.query(
        `SELECT 
            pokemon.id, 
            pokemon.name AS pokemon_name, 
            type.name AS type_name, 
            trainer.name AS trainer_name 
        FROM 
            pokemon 
        LEFT JOIN type 
            ON pokemon.type = type.id 
        LEFT JOIN trainer 
            ON pokemon.trainer = trainer.id 
        WHERE type.name LIKE '${string}';`,
    );
    return rows;
}

export async function getItemsFilteredByTrainer(string) {
    const { rows } = await pool.query(
        `SELECT 
            pokemon.id, 
            pokemon.name AS pokemon_name, 
            type.name AS type_name, 
            trainer.name AS trainer_name 
        FROM 
            pokemon 
        LEFT JOIN type 
            ON pokemon.type = type.id 
        LEFT JOIN trainer 
            ON pokemon.trainer = trainer.id 
        WHERE trainer.name LIKE '${string}';`,
    );
    return rows;
}

export async function getItemsFilteredByTypeAndTrainer(
    typeString,
    trainerString,
) {
    const { rows } = await pool.query(
        `SELECT 
            pokemon.id, 
            pokemon.name AS pokemon_name, 
            type.name AS type_name, 
            trainer.name AS trainer_name 
        FROM 
            pokemon 
        LEFT JOIN type 
            ON pokemon.type = type.id 
        LEFT JOIN trainer 
            ON pokemon.trainer = trainer.id 
        WHERE type.name LIKE '${typeString}'
        AND trainer.name LIKE '${trainerString}';`,
    );
    return rows;
}

export async function getAllTypes() {
    // const { rows } = await pool.query('SELECT * FROM pokemon');
    const { rows } = await pool.query('SELECT name FROM type;');
    return rows;
}

export async function getAllTrainers() {
    // const { rows } = await pool.query('SELECT * FROM pokemon');
    const { rows } = await pool.query('SELECT name FROM trainer;');
    return rows;
}

export async function postCreateType(type) {
    await pool.query('INSERT INTO type (name) VALUES ($1)', [type]);
}

export async function postCreateTrainer(trainer) {
    await pool.query('INSERT INTO trainer (name) VALUES ($1)', [trainer]);
}

// export async function postAddMessage(message, username) {
//     await pool.query(
//         'INSERT INTO messages (message, username, created_at) VALUES ($1, $2, $3)',
//         [message, username, 'NOW()'],
//     );
// }
