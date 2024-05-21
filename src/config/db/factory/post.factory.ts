import { Injectable } from '@nestjs/common';
import { Post } from '../../../posts/entities/post.entity';
import { Category } from 'src/categories/entities/category.entity';
import * as faker from 'faker';

@Injectable()
export class PostFactory {
  create(categories: Category[]) {
    return this.createPost(categories);
  }

  _createPost(category: Category): Post {
    const post = new Post();
    post.title = faker.random.words(5); // Generate a random title with 5 words
    post.content = faker.random.words(50); // Generate a random content with 3 paragraphs
    post.category = category;
    return post;
  }

  createPost(categories: Category[]): Post[] {
    const posts: Post[] = categories.map((category) =>
      this._createPost(category),
    );
    return posts;
  }
}
