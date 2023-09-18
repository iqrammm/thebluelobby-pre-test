import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config({
  path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

export const dataSourceOptions: DataSourceOptions = {
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  entities: ['dist/**/*.entity.js'],
  database: process.env.POSTGRES_DB,
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
