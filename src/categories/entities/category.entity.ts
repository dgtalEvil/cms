import { Entity, Column } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { BaseEntity } from '../../shared/types/base.entity';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @Column({ unique: true, nullable: false })
  @IsString()
  @Length(1, 255)
  name: string;
}
