import pool from './pool.js';

export async function getAllItems() {
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
        WHERE type.name = $1;`,
        [string],
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
        WHERE trainer.name = $1;`,
        [string],
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
            COALESCE(type.name, 'Unknown') AS type_name, 
            COALESCE(trainer.name, 'Unknown') AS trainer_name
        FROM 
            pokemon 
        LEFT JOIN type 
            ON pokemon.type = type.id 
        LEFT JOIN trainer 
            ON pokemon.trainer = trainer.id 
        WHERE (type.name = $1)
        AND (trainer.name = $2);`,
        [typeString, trainerString], // Exact match parameters
    );
    return rows;
}

export async function getAllTypes() {
    const { rows } = await pool.query('SELECT name FROM type;');
    return rows;
}

export async function getAllTrainers() {
    const { rows } = await pool.query('SELECT name FROM trainer;');
    return rows;
}

export async function postCreateType(type) {
    await pool.query('INSERT INTO type (name) VALUES ($1)', [type]);
}

export async function postCreateTrainer(trainer) {
    await pool.query('INSERT INTO trainer (name) VALUES ($1)', [trainer]);
}

export async function postCreatePokemon(name, type, trainer) {
    const typeQuery = await pool.query(
        `SELECT id FROM type WHERE type.name LIKE $1;`,
        [type],
    );
    const typeId = typeQuery.rows.length > 0 ? typeQuery.rows[0].id : null;
    const trainerQuery = await pool.query(
        `SELECT id FROM trainer WHERE trainer.name LIKE $1;`,
        [trainer],
    );
    const trainerId =
        trainerQuery.rows.length > 0 ? trainerQuery.rows[0].id : null;
    console.log(typeId);
    console.log(trainerId);
    await pool.query(
        'INSERT INTO pokemon (name, type, trainer) VALUES ($1, $2, $3)',
        [name, typeId, trainerId],
    );
}

export async function postUpdateType(oldName, newName) {
    await pool.query('UPDATE type SET name = $1 WHERE name = $2;', [
        newName,
        oldName,
    ]);
}

export async function postUpdateTrainer(oldName, newName) {
    await pool.query('UPDATE trainer SET name = $1 WHERE name = $2;', [
        newName,
        oldName,
    ]);
}

export async function postUpdatePokemonName(Id, newName) {
    await pool.query('UPDATE pokemon SET name = $1 WHERE id = $2;', [
        newName,
        Id,
    ]);
}

export async function postUpdatePokemonType(Id, newType) {
    await pool.query('UPDATE pokemon SET type = $1 WHERE id = $2;', [
        newType,
        Id,
    ]);
}

export async function postUpdatePokemonTrainer(Id, newTrainer) {
    await pool.query('UPDATE pokemon SET trainer = $1 WHERE id = $2;', [
        newTrainer,
        Id,
    ]);
}

export async function getTypeId(name) {
    const { rows } = await pool.query('SELECT id FROM type WHERE name = $1;', [
        name,
    ]);
    return rows;
}

export async function getTrainerId(name) {
    const { rows } = await pool.query(
        'SELECT id FROM trainer WHERE name = $1;',
        [name],
    );
    return rows;
}

export async function postDeleteType(type) {
    await pool.query('DELETE FROM type WHERE name = $1;', [type]);
}

export async function postDeleteTrainer(trainer) {
    await pool.query('DELETE FROM trainer WHERE name = $1;', [trainer]);
}

export async function postDeletePokemon(id) {
    await pool.query('DELETE FROM pokemon WHERE id = $1;', [id]);
}
