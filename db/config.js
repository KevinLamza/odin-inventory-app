import 'dotenv/config';
import fs from 'fs';

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(process.env.CA_PATH).toString(),
    },
};

export default config;
