import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool: Pool = new Pool({
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
});