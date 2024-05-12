import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsString, Length } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 255)
  content: string;
}
