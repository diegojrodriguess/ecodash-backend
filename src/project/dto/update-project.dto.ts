import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsIn,
  IsObject,
} from 'class-validator';

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: 'Updated Project Name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ enum: ['active', 'finalized'], example: 'finalized' })
  @IsString()
  @IsOptional()
  @IsIn(['active', 'finalized'])
  status?: string;

  @ApiPropertyOptional({ example: { type: 'Point', coordinates: [90.0, -10.0] } })
  @IsObject()
  @IsOptional()
  geometry?: object;

  @ApiPropertyOptional({ example: 'researcher-uuid' })
  @IsString()
  @IsOptional()
  researcherId?: string;
}