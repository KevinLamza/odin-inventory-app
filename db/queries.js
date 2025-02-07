import pool from './pool.js';

export async function getAllItems() {
    const { rows } = await pool.query('SELECT * FROM pokemon');
    return rows;
}

// export async function postAddMessage(message, username) {
//     await pool.query(
//         'INSERT INTO messages (message, username, created_at) VALUES ($1, $2, $3)',
//         [message, username, 'NOW()'],
//     );
// }
