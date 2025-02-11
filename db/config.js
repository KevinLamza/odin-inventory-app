import 'dotenv/config';
import path from 'path';
import fs from 'fs';

const caPath = path.resolve(process.cwd(), process.env.CA_PATH);

console.log('Resolved CA_PATH:', caPath); // Debugging output

if (!fs.existsSync(caPath)) {
    console.error(`Error: CA certificate file not found at ${caPath}`);
    process.exit(1);
}

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(caPath).toString(),
    },
};

export default config;
