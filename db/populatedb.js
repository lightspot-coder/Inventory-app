#! /usr/bin/env node

const { Client } = require("pg");
const { env } = require("node:process");

//console.log(env.USER);
//console.log(env.PASSWORD);

const SQL = `
CREATE TABLE IF NOT EXISTS developers (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR (40) 
);
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  developer_id integer REFERENCES developers,
  title VARCHAR ( 40 ),
  genre VARCHAR ( 40 )
);

INSERT INTO developers (name) 
VALUES
  ('Bungie'),
  ('Blizzard'),
  ('Id Software'),
('Bethesda');

INSERT INTO games (developer_id, title, genre) 
VALUES
  (2,'Starcraft','Strategy'),
  (1,'Halo','Shooter'),
  (1,'Halo 2','Shooter'),
  (3, 'Quake','Shooter'),
  (3, 'Doom','Shooter'),
  (4,'Fallout','Rol');
`;

async function main() {
  console.log("seeding...");
  console.log(
    `postgresql://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}:${env.PGPORT}/${env.PGDATABASE}`,
  );
  console.log("postgresql://odinstudent:jp1843@localhost:5432/top_users");
  const client = new Client({
    connectionString:
      /*"postgresql://odinstudent:jp1843@localhost:5432/top_users",*/
      `postgresql://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}:${env.PGPORT}/${env.PGDATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
