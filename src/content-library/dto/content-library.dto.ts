import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateContentLibraryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  video: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  thumbnail: string;
}
export class UpdateContentLibraryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  video: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  thumbnail: string;
}
