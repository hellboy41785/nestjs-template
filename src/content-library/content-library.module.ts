import { Module } from '@nestjs/common';
import { ContentLibraryService } from './content-library.service';
import { ContentLibraryController } from './content-library.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/utils/prisma.service';

@Module({
  providers: [ContentLibraryService, PrismaService, JwtService],
  controllers: [ContentLibraryController],
})
export class ContentLibraryModule {}
