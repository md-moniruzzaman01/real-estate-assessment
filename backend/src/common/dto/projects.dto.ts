import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: 'pending' | 'in-progress' | 'completed';

  @IsNumber()

  createdById: number;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
