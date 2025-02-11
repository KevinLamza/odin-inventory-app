#! /usr/bin/env node
import 'dotenv/config';
import pg from 'pg';
import config from './config.js';

const SQL = `
CREATE TABLE IF NOT EXISTS trainer (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS type (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS pokemon (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  type INTEGER NOT NULL,
  trainer INTEGER NOT NULL
);

DELETE FROM trainer;
ALTER SEQUENCE trainer_id_seq RESTART WITH 1;
DELETE FROM type;
ALTER SEQUENCE type_id_seq RESTART WITH 1;
DELETE FROM pokemon;
ALTER SEQUENCE pokemon_id_seq RESTART WITH 1;

INSERT INTO trainer (name) 
VALUES
  ('Red'),
  ('Blue'),
  ('Gold'),
  ('Silver');

INSERT INTO type (name) 
VALUES
  ('Water'),
  ('Grass'),
  ('Fire'),
  ('Poison'),
  ('Fight'),
  ('Flight'),
  ('Rock'),
  ('Ground'),
  ('Fairy'),
  ('Psycho'),
  ('Ghost'),
  ('Bug'),
  ('Steel'),
  ('Electro'),
  ('Normal'),
  ('Dark'),
  ('Ice'),
  ('Dragon');

INSERT INTO pokemon (name, type, trainer)
VALUES
  ('Glurak', 3, 1),
  ('Turtok', 1, 1),
  ('Bisaflor', 2, 1),
  ('Tauboss', 6, 2),
  ('Nidoking', 4, 2)
`;

async function main() {
    console.log('seeding ...');
    const client = new pg.Client(config);
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();
