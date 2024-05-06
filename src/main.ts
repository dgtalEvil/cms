import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS,
  PORT,
} from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger,
  });
  // Enable basic Helmet security headers
  app.use(helmet());

  // Configure rate limiting middleware
  const limiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX_REQUESTS, // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
  const port = process.env.PORT || PORT;
  await app.listen(port);
}
bootstrap();
