import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { PrismaService } from 'src/utils/prisma.service';
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
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async createCourse(req: Request, dto: CreateCourseDto) {
    const mentor: MentorPayload = req['user'];
    const user = await this.prisma.mentor.findUnique({
      where: {
        email: mentor.email,
      },
    });
    const course = await this.prisma.course.create({
      data: {
        ...dto,
        mentorId: user.id,
      },
    });

    return course;
  }
  async updateCourse(req: Request, dto: UpdateCourseDto) {
    const courseId = req.query.id as string;
    if (!courseId) throw new UnauthorizedException('Course id is not provided');
    const course = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...dto,
      },
    });

    return course;
  }
  async deleteCourse(req: Request) {
    const courseId = req.query.id as string;
    if (!courseId) throw new UnauthorizedException('Course id is not provided');
    const course = await this.prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    return course;
  }
  async getCourses(req: Request) {
    const mentor: MentorPayload = req['user'];
    const user = await this.prisma.mentor.findUnique({
      where: {
        email: mentor.email,
      },
    });
    const courses = await this.prisma.course.findMany({
      where: {
        mentorId: user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return courses;
  }
  async getCoursesById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: id,
      },
    });

    return course;
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
