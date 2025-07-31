import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateResearcherDto {
  @ApiProperty({ example: 'Jane Goodall' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
