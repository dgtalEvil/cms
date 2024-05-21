import { Entity, Column, ManyToOne } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { BaseEntity } from '../../shared/types/base.entity';
import { Category } from 'src/categories/entities/category.entity';

@Entity({ name: 'post' })
export class Post extends BaseEntity {
  @Column({ nullable: false })
  @IsString()
  @Length(1, 100)
  title: string;

  @Column({ type: 'text', nullable: false })
  @IsString()
  @Length(1, 255)
  content: string;

  @ManyToOne(() => Category, { nullable: false })
  category: Category;
}
