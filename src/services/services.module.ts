import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaService } from 'src/utils/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ServicesService, PrismaService, JwtService],
  controllers: [ServicesController],
})
export class ServicesModule {}
