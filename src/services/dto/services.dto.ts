import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Status {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export class ServiceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class UpdateServiceDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  rejectionReason: string;

  @ApiProperty({
    enum: Status,
  })
  @IsNotEmpty()
  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;
}
