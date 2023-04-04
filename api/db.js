import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config()

export const pool = new Pool({
    host: 'localhost',
    user: 'root',
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
})
