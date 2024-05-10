import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

export enum Day {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export class CreateAvailabilityDto {
  @ApiProperty({
    isArray: true,
    enum: Day,
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(Day, { each: true })
  days: Day[];

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
}
export class UpdateAvailabilityDto {
  @ApiProperty({
    isArray: true,
    enum: Day,
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(Day, { each: true })
  days: Day[];

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
}
