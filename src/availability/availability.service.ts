import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import {
  CreateAvailabilityDto,
  UpdateAvailabilityDto,
} from './dto/availability.dto';
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
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async createAvailability(req: Request, dto: CreateAvailabilityDto) {
    try {
      const mentor: MentorPayload = req['user'];
      const user = await this.prisma.mentor.findUnique({
        where: {
          email: mentor.email,
        },
      });
      const data = { ...dto, mentorId: user.id };
      const availability = await this.prisma.availability.create({
        data,
      });
      return availability;
    } catch (error) {
      throw new UnauthorizedException(error.message); // Re-throw the error if you want to propagate it upwards
    }
  }

  async updateAvailability(req: Request, dto: UpdateAvailabilityDto) {
    const availabilityId = req.query.id as string;
    if (!availabilityId)
      throw new UnauthorizedException('Availability id is not provided');
    const availability = await this.prisma.availability.update({
      where: {
        id: availabilityId,
      },
      data: {
        ...dto,
      },
    });
    return availability;
  }
  async getAvailability(req: Request) {
    const mentor: MentorPayload = req['user'];
    const user = await this.prisma.mentor.findUnique({
      where: {
        email: mentor.email,
      },
    });
    const availability = await this.prisma.availability.findUnique({
      where: {
        mentorId: user.id,
      },
    });
    return availability;
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
