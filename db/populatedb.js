#! /usr/bin/env node
import 'dotenv/config';
import pg from 'pg';
import config from './config.js';

const SQL = `
CREATE TABLE IF NOT EXISTS trainer (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name VARCHAR ( 255 )
);

INSERT INTO trainer (id, name) VALUES (0, 'UnknownTrainer')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS type (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name VARCHAR ( 255 )
);

INSERT INTO type (id, name) VALUES (0, 'UnknownType')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS pokemon (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  type INTEGER,
  trainer INTEGER
);

ALTER TABLE pokemon 
ALTER COLUMN type SET DEFAULT 0;
ALTER TABLE pokemon 
ALTER COLUMN trainer SET DEFAULT 0;

DELETE FROM trainer WHERE id > 0;
ALTER SEQUENCE trainer_id_seq RESTART WITH 1;
DELETE FROM type WHERE id > 0;
ALTER SEQUENCE type_id_seq RESTART WITH 1;
DELETE FROM pokemon;
ALTER SEQUENCE pokemon_id_seq RESTART WITH 1;

ALTER TABLE pokemon 
DROP CONSTRAINT IF EXISTS pokemon_type_fk, 
ADD CONSTRAINT pokemon_type_fk 
FOREIGN KEY (type) REFERENCES type(id) 
ON DELETE SET DEFAULT;

ALTER TABLE pokemon 
DROP CONSTRAINT IF EXISTS pokemon_trainer_fk, 
ADD CONSTRAINT pokemon_trainer_fk 
FOREIGN KEY (trainer) REFERENCES trainer(id) 
ON DELETE SET DEFAULT;

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
