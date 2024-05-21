import { Repository } from 'typeorm';
import { SeederService } from './seeder.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../posts/entities/post.entity';
import { PostFactory } from '../factory/post.factory';
import { Category } from '../../../categories/entities/category.entity';
import { LoggerService } from '../../../shared/logger/logger.service';

export class PostSeeder implements SeederService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly factory: PostFactory,
    private readonly logger: LoggerService,
  ) {}

  async getCategory(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async seed() {
    try {
      this.logger.info('Seeding Posts');

      const categories: Category[] = await this.getCategory();
      const posts = this.factory.create(categories);
      await this.postRepository.save(posts);
      this.logger.info('Posts Seeded');
    } catch (error) {
      this.logger.error(`Error Seeding Post Data: ${error}`);
    }
  }
}
