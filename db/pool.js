import pkg from 'pg';
const { Pool } = pkg;

import config from './config.js';

export default new Pool(config);
