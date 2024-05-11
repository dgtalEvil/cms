import { Injectable } from '@nestjs/common';
import { Category } from 'src/categories/entities/category.entity';
import * as faker from 'faker';
@Injectable()
export class CategoryFactory {
  create(): Category[] {
    const categories: Category[] = [
      this.createDefaultCategory(),
      ...this.createOtherCategories(),
    ];
    return categories;
  }

  _createCategory(name: string): Category {
    const category = new Category();
    category.id = faker.datatype.uuid();
    category.name = name;
    return category;
  }

  createDefaultCategory(): Category {
    return this._createCategory('Default');
  }

  createOtherCategories(): Category[] {
    const names: string[] = [
      'Technology',
      'Science',
      'Travel',
      'Fashion',
      'Food',
    ];
    const categories: Category[] = names.map((name) =>
      this._createCategory(name),
    );
    return categories;
  }
}
