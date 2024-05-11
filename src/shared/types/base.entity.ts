import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @CreateDateColumn()
  @IsDate()
  @Transform(({ value }) => value.toISOString()) // Transform the date to ISO string format
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  @Transform(({ value }) => value.toISOString()) // Transform the date to ISO string format
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? value.toISOString() : null)) // Transform the date to ISO string format or null
  deletedAt: Date | null;
}
