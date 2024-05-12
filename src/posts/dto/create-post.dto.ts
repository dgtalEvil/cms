import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 255)
  content: string;
}
