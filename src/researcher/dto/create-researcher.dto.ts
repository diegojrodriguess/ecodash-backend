import { IsString, IsNotEmpty } from 'class-validator';

export class CreateResearcherDto {
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;
}