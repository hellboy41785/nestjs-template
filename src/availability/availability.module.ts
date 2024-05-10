import { Module } from '@nestjs/common';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { PrismaService } from 'src/utils/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService, PrismaService, JwtService],
})
export class AvailabilityModule {}
