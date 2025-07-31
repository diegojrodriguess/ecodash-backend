import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateResearcherDto {
  @ApiPropertyOptional({ example: 'Jane G. Updated' })
  @IsString()
  @IsOptional()
  name?: string;
}