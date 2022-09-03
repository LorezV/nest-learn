import { DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'

dotenv.config()

export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*.{.js,.ts}'],
  synchronize: true
}

export const SECRET_KEY = process.env.SECRET_KEY