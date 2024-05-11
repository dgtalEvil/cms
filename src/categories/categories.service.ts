import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { LoggerService } from 'src/shared/logger/logger.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly logger: LoggerService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = this.repository.create(createCategoryDto);

      // Save the new category to the database
      return await this.repository.save(newCategory);
    } catch (error) {
      this.logger.error(`Error creating category: ${error.message}`);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      this.logger.error(`Error retrieving all categories: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Category> {
    try {
      const response = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (!response) {
        this.logger.error(`Category with ID ${id} not found`);
      }
      return response;
    } catch (error) {
      this.logger.error(`Error retrieving Category: ${error.message}`);
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      let category = await this.findOne(id);

      // Update the category properties based on the DTO
      if (updateCategoryDto.name !== category.name) {
        category.name = updateCategoryDto.name;
        category = await this.repository.save(category);
      }
      return category;
    } catch (error) {
      this.logger.error(`Error updating Category: ${error.message}`);
    }
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    category.deletedAt = new Date();
    await this.repository.softRemove(category);
  }
}
