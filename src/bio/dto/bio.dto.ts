import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum Status {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export class BioDto {
  @ApiProperty()
  @IsString()
  bio: string;
}

export class VerifyBioDto {
  @ApiProperty({
    enum: Status,
  })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
