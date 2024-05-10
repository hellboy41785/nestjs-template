import { Module } from '@nestjs/common';
import { BioController } from './bio.controller';
import { BioService } from './bio.service';
import { PrismaService } from 'src/utils/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BioController],
  providers: [BioService, PrismaService, JwtService],
})
export class BioModule {}
