import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryFactory } from '../factory/category.factory';
import { LoggerService } from 'src/shared/logger/logger.service';
import { SeederService } from './seeder.interface';

export class CategorySeeder implements SeederService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly factory: CategoryFactory,
    private readonly logger: LoggerService,
  ) {}

  async seed() {
    this.logger.info('Seeding Categories');
    const category = this.factory.create();
    try {
      await this.repository.save(category);
      this.logger.info('Categories Seeded');
      return;
    } catch (error) {
      this.logger.error(`Error Seeding Category Data: ${error}`);
    }
  }
}
