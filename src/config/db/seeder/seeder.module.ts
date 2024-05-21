// seeder.module.ts

import { Module } from '@nestjs/common';
import { CategorySeeder } from './category.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../../categories/entities/category.entity';
import { CategoryFactory } from '../factory/category.factory';
import { LoggerService } from '../../../shared/logger/logger.service';
import { PostSeeder } from './post.seeder';
import { PostFactory } from '../factory/post.factory';
import { Post } from '../../../posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Post])],
  providers: [
    LoggerService,
    CategorySeeder,
    CategoryFactory,
    PostSeeder,
    PostFactory,
  ],
  exports: [CategorySeeder, PostSeeder],
})
export class SeederModule {}
