import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import ormconfig from './config/db/ormconfig';
import { SeederModule } from './config/db/seeder/seeder.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), CategoriesModule, SeederModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
