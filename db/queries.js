import pool from './pool.js';

export async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages');
    console.log(rows);
    return rows;
}

export async function postAddMessage(message, username) {
    await pool.query(
        'INSERT INTO messages (message, username, created_at) VALUES ($1, $2, $3)',
        [message, username, 'NOW()'],
    );
}
