import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/shared/logger/logger.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
    private readonly logger: LoggerService,
  ) {}

  async create(payload: CreatePostDto): Promise<Post> {
    try {
      const newPost = this.repository.create(payload);

      return await this.repository.save(newPost);
    } catch (error) {
      this.logger.error(`Error creating post: ${error.message}`);
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      this.logger.error(`Error retrieving all posts: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      const response = await this.repository.findOne({
        where: {
          id,
        },
      });
      if (!response) {
        this.logger.error(`Post with ID ${id} not found`);
      }
      return response;
    } catch (error) {
      this.logger.error(`Error retrieving Post: ${error.message}`);
    }
  }

  async update(id: string, payload: UpdatePostDto): Promise<Post> {
    try {
      let post = await this.findOne(id);

      // Update the category properties based on the DTO
      post.title = payload.title;
      post.content = payload.content;
      post = await this.repository.save(post);

      return post;
    } catch (error) {
      this.logger.error(`Error updating Category: ${error.message}`);
    }
  }

  async remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
