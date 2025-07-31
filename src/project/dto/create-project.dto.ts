import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsObject,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Mangrove Recovery' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ['active', 'finalized'], example: 'active' })
  @IsString()
  @IsIn(['active', 'finalized'])
  status: string;

  @ApiProperty({
    example: { type: 'Point', coordinates: [100.0, 0.0] },
    description: 'GeoJSON geometry object',
  })
  @IsObject()
  @IsNotEmpty()
  geometry: object;

  @ApiProperty({ example: 'researcher-uuid' })
  @IsString()
  @IsNotEmpty()
  researcherId: string;
}