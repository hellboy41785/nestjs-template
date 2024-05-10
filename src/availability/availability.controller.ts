import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request as Req,
  Patch,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
import { AvailabilityService } from './availability.service';
import { JwtMentor } from 'src/guards/jwt.mentor.guard';
import {
  CreateAvailabilityDto,
  UpdateAvailabilityDto,
} from './dto/availability.dto';
import { Request } from 'express';

@ApiTags('availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private availability: AvailabilityService) {}

  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @Post('create')
  async createAvailability(
    @Req() req: Request,
    @Body() dto: CreateAvailabilityDto,
  ) {
    return await this.availability.createAvailability(req, dto);
  }

  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @ApiQuery({ name: 'id', required: true })
  @Patch('update')
  async updateAvailability(
    @Req() req: Request,
    @Body() dto: UpdateAvailabilityDto,
  ) {
    return await this.availability.updateAvailability(req, dto);
  }

  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Mentor Availability' })
  @Get()
  async getAvailability(@Req() req: Request) {
    return await this.availability.getAvailability(req);
  }
}
