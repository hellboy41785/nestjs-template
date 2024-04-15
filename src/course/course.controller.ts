import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request as Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { JwtMentor } from 'src/guards/jwt.mentor.guard';
import { Request } from 'express';

@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @Get('all')
  async getCourses(@Req() req: Request) {
    return await this.courseService.getCourses(req);
  }
  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @Get('/:id')
  async getCoursesById(@Param('id') id: string) {
    return await this.courseService.getCoursesById(id);
  }
  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @Post('create')
  async createCourse(@Req() req: Request, @Body() dto: CreateCourseDto) {
    return await this.courseService.createCourse(req, dto);
  }

  @UseGuards(JwtMentor)
  @Patch('update')
  @ApiQuery({ name: 'id', required: true })
  @ApiBearerAuth()
  async updateCourse(@Req() req: Request, @Body() dto: UpdateCourseDto) {
    return await this.courseService.updateCourse(req, dto);
  }

  @UseGuards(JwtMentor)
  @Delete('delete')
  @ApiQuery({ name: 'id', required: true })
  @ApiBearerAuth()
  async deleteCourse(@Req() req: Request) {
    return await this.courseService.deleteCourse(req);
  }
}
