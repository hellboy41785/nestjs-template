import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { BioDto, VerifyBioDto } from './dto/bio.dto';
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
export class BioService {
  constructor(private prisma: PrismaService) {}
  async createBio(req: Request, dto: BioDto) {
    try {
      const mentor: MentorPayload = req['user'];
      const user = await this.prisma.mentor.findUnique({
        where: {
          email: mentor.email,
        },
      });
      const data = { ...dto, mentorId: user.id };
      const bio = await this.prisma.bio.create({
        data,
      });
      return bio;
    } catch (error) {
      throw new UnauthorizedException(error.message); // Re-throw the error if you want to propagate it upwards
    }
  }
  async updateBio(req: Request, dto: BioDto) {
    const bioId = req.query.id as string;
    if (!bioId)
      throw new UnauthorizedException('Availability id is not provided');
    const bio = await this.prisma.bio.update({
      where: {
        id: bioId,
      },
      data: {
        ...dto,
        status: 'Pending',
      },
    });
    return bio;
  }

  async verifyBio(req: Request, dto: VerifyBioDto) {
    const bioId = req.query.id as string;
    if (!bioId)
      throw new UnauthorizedException('Availability id is not provided');
    const bio = await this.prisma.bio.update({
      where: {
        id: bioId,
      },
      data: {
        ...dto,
      },
    });
    return bio;
  }

  async getBio(req: Request) {
    const mentor: MentorPayload = req['user'];
    const user = await this.prisma.mentor.findUnique({
      where: {
        email: mentor.email,
      },
    });
    const bio = await this.prisma.bio.findUnique({
      where: {
        mentorId: user.id,
      },
    });
    return bio;
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
