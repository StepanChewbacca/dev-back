import { Client } from 'pg';

export const pgClient = new Client({
  user: 'chewie',
  host: 'localhost',
  database: 'postgres',
  password: '12345678',
  port: 5432,
});

pgClient.connect().then(() => console.log('Connected'));
