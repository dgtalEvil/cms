// seeder.module.ts

import { Module } from '@nestjs/common';
import { CategorySeeder } from './category.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { CategoryFactory } from '../factory/category.factory';
import { LoggerService } from 'src/shared/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [LoggerService, CategorySeeder, CategoryFactory],
  exports: [CategorySeeder],
})
export class SeederModule {}
