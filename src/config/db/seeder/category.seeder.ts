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
    try {
      this.logger.info('Seeding Categories');

      // Fetch existing category names from the database
      const existingCategories = (await this.repository.find()).map(
        (category) => category.name,
      );

      // Create new categories
      const newCategories: Category[] = this.factory.create();

      // Filter out categories that already exist in the database
      const categoriesToSave = newCategories.filter(
        (category) => !existingCategories.includes(category.name),
      );

      // Perform bulk insert for new categories
      if (categoriesToSave.length > 0) {
        await this.repository.insert(categoriesToSave);
        categoriesToSave.forEach((category) => {
          this.logger.info(`Category ${category.name} Seeded`);
        });
      } else {
        this.logger.info('No new categories to seed');
      }
    } catch (error) {
      this.logger.error(`Error Seeding Category Data: ${error}`);
    }
  }
}
