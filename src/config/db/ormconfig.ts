import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Category } from 'src/categories/entities/category.entity';
import { Post } from 'src/posts/entities/post.entity';

dotenv.config(); // Load environment variables from .env file

const ormconfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Category, Post],
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
  poolSize: 10,
};

export default ormconfig;
