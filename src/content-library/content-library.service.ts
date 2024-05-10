import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import {
  CreateContentLibraryDto,
  UpdateContentLibraryDto,
} from './dto/content-library.dto';
import { Request } from 'express';

interface MentorPayload {
  email: string;
  sub: {
    name: string;
  };
  iat: number;
  exp: number;
}

@Injectable()
export class ContentLibraryService {
  constructor(private prisma: PrismaService) {}
  async createContentLibrary(req: Request, dto: CreateContentLibraryDto) {
    const mentor: MentorPayload = req['user'];
    const user = await this.prisma.mentor.findUnique({
      where: {
        email: mentor.email,
      },
    });
    const contentLibrary = await this.prisma.contentLibrary.create({
      data: {
        ...dto,
        mentorId: user.id,
      },
    });

    return contentLibrary;
  }
  async updateContentLibrary(req: Request, dto: UpdateContentLibraryDto) {
    const contentLibraryId = req.query.id as string;
    if (!contentLibraryId)
      throw new UnauthorizedException('ContentLibrary id is not provided');
    const contentLibrary = await this.prisma.contentLibrary.update({
      where: {
        id: contentLibraryId,
      },
      data: {
        ...dto,
      },
    });

    return contentLibrary;
  }
  async deleteContentLibrary(req: Request) {
    const contentLibraryId = req.query.id as string;
    if (!contentLibraryId)
      throw new UnauthorizedException('ContentLibrary id is not provided');
    const contentLibrary = await this.prisma.contentLibrary.delete({
      where: {
        id: contentLibraryId,
      },
    });

    return contentLibrary;
  }
  async getContentLibraries(req: Request) {
    const mentor: MentorPayload = req['user'];
    const user = await this.prisma.mentor.findUnique({
      where: {
        email: mentor.email,
      },
    });
    const courses = await this.prisma.contentLibrary.findMany({
      where: {
        mentorId: user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return courses;
  }
  async getContentLibrariesById(id: string) {
    const contentLibrary = await this.prisma.contentLibrary.findUnique({
      where: {
        id: id,
      },
    });

    return contentLibrary;
  }

  async validateUser(email: string) {
    const user = await this.prisma.mentor.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid user token');

    return user;
  }
}
