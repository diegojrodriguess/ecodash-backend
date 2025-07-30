import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsObject,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(['active', 'finalized'], {
    message: 'Status must be either "active" or "finalized".',
  })
  status: string;

  @IsObject()
  @IsNotEmpty({ message: 'Geometry is required and must be a GeoJSON object.' })
  geometry: object;

  @IsString()
  @IsNotEmpty({ message: 'Researcher ID is required.' })
  researcherId: string;
}
