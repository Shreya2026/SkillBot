// drizzle.config.js
import 'dotenv/config';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '.env.local') }); // manually load .env.local

/** @type {import("drizzle-kit").Config} */
export default {
  schema: './configs/schema.jsx', // your schema path
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING, // loaded from .env.local
  },
};
