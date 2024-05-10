import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/utils/prisma.service';
import { ServiceDto, UpdateServiceDto } from './dto/services.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async mentorServiceCreate(req: Request, dto: ServiceDto) {
    const mentor: string = req['id'];
    const service = await this.prisma.service.create({
      data: {
        ...dto,
        creator: {
          connect: {
            id: mentor, // Connect the service to the mentor
          },
        },
      },
    });
    return service;
  }
  async adminServiceCreate(req: Request, dto: ServiceDto) {
    const admin: string = req['id'];
    const service = await this.prisma.service.create({
      data: {
        ...dto,
        status: 'Accepted',
        creator: {
          connect: {
            id: admin, // Connect the service to the mentor
          },
        },
      },
    });
    return service;
  }

  async approve(req: Request, dto: UpdateServiceDto) {
    const admin: string = req['id'];
    const service = await this.prisma.service.update({
      where: {
        id: dto.id,
      },
      data: {
        status: 'Accepted',
        admin: {
          connect: {
            id: admin, // Connect the service to the admin
          },
        },
      },
    });
    return service;
  }
  async rejected(req: Request, dto: UpdateServiceDto) {
    const service = await this.prisma.service.update({
      where: {
        id: dto.id,
      },
      data: {
        status: 'Rejected',
        rejectionReason: dto.rejectionReason,
      },
    });
    return service;
  }
}
