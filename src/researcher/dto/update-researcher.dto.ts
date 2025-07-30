import { IsString, IsOptional } from 'class-validator';

export class UpdateResearcherDto {
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name?: string;
}