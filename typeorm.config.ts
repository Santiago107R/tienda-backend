import * as dotenv from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

dotenv.config();

const stage = process.env.STAGE || 'dev';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: stage === 'dev' ? 'localhost' : process.env.PGHOST,
    port: process.env.PGPORT ? +process.env.PGPORT : 5432,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    logging: stage === 'dev',
    entities: [join(__dirname, 'src/**/entities/*.entity{.ts,.js}')],
    migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
});