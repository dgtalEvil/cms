import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS,
  PORT,
} from './shared/constants';
import { SeederService } from './config/db/seeder/seeder.interface';
import { SeederModule } from './config/db/seeder/seeder.module';
import { CategorySeeder } from './config/db/seeder/category.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable basic Helmet security headers
  app.use(helmet());

  // Configure rate limiting middleware
  const limiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX_REQUESTS, // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  // DB Seeding
  const seederModule = app.select(SeederModule);
  const categorySeeder: SeederService = seederModule.get(CategorySeeder);

  // add the seeders in below []
  const seeders: SeederService[] = [categorySeeder];

  for (const seeder of seeders) {
    await seeder.seed();
  }

  const port = process.env.PORT || PORT;
  await app.listen(port, () => {
    console.log('🚀 ~ Nest application successfully started in port :', port);
  });
}
bootstrap();
