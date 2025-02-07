import pool from './pool.js';

export async function getAllItems() {
    // const { rows } = await pool.query('SELECT * FROM pokemon');
    const { rows } = await pool.query(
        'SELECT pokemon.id, pokemon.name AS pokemon_name, type.name AS type_name, trainer.name AS trainer_name FROM pokemon LEFT JOIN type ON pokemon.type = type.id LEFT JOIN trainer ON pokemon.trainer = trainer.id;',
    );
    console.log(rows);
    return rows;
}

export async function getAllTypes() {
    // const { rows } = await pool.query('SELECT * FROM pokemon');
    const { rows } = await pool.query('SELECT name FROM type;');
    console.log(rows);
    return rows;
}

// export async function postAddMessage(message, username) {
//     await pool.query(
//         'INSERT INTO messages (message, username, created_at) VALUES ($1, $2, $3)',
//         [message, username, 'NOW()'],
//     );
// }
