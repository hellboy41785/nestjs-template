import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCourseDto {
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
  image: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  video: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  videoThumbnail: string;
}
export class UpdateCourseDto {
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
  image: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  video: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  videoThumbnail: string;
}
