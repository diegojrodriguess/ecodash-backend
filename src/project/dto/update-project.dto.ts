import {
  IsString,
  IsOptional,
  IsIn,
  IsObject,
} from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsIn(['active', 'finalized'], {
    message: 'Status must be either "active" or "finalized".',
  })
  status?: string;

  @IsObject()
  @IsOptional()
  geometry?: object;

  @IsString()
  @IsOptional()
  researcherId?: string;
}
