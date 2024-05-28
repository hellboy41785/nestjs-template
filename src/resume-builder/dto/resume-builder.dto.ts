import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsDate,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class DescriptionItem {
  @ApiProperty()
  @IsString()
  description: string;
}

export class SummaryDto {
  @ApiProperty()
  @IsString()
  summary: string;
}

export class ExperienceDto {
  @ApiProperty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsDate()
  start: string;

  @ApiProperty()
  @IsDate()
  end: string;

  @ApiProperty({
    type: [DescriptionItem],
    description: 'Array of description items',
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DescriptionItem)
  description: DescriptionItem[];
}
