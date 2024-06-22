import { DataSource } from 'typeorm';
import { join } from 'path';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'shopping_db',
  synchronize: false,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'db', 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migration_table',
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
