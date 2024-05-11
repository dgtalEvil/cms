import { Injectable } from '@nestjs/common';
import { Category } from 'src/categories/entities/category.entity';
import * as faker from 'faker';
@Injectable()
export class CategoryFactory {
  create(): Category {
    return this.createDefault();
  }

  createDefault(): Category {
    const category = new Category();
    category.id = faker.datatype.uuid();
    category.name = 'Default';
    return category;
  }
}
