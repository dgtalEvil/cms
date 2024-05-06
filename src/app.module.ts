import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import ormconfig from './config/db/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
