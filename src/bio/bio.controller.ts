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
import { BioService } from './bio.service';
import { JwtMentor } from 'src/guards/jwt.mentor.guard';
import { BioDto, VerifyBioDto } from './dto/bio.dto';
import { Request } from 'express';
import { JwtAdmin } from 'src/guards/jwt.admin.guard';

@ApiTags('Mentor Bio')
@Controller('bio')
export class BioController {
  constructor(private bio: BioService) {}

  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @Post('create')
  async createBio(@Req() req: Request, @Body() dto: BioDto) {
    return await this.bio.createBio(req, dto);
  }

  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @ApiQuery({ name: 'id', required: true })
  @Patch('update')
  async updateBio(@Req() req: Request, @Body() dto: BioDto) {
    return await this.bio.updateBio(req, dto);
  }

  @UseGuards(JwtAdmin)
  @ApiBearerAuth()
  @ApiQuery({ name: 'id', required: true })
  @ApiOperation({ summary: 'Only Admin Can Change Status' })
  @Patch('verify')
  async verifyBio(@Req() req: Request, @Body() dto: VerifyBioDto) {
    return await this.bio.verifyBio(req, dto);
  }

  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Mentor Bio' })
  @Get()
  async getBio(@Req() req: Request) {
    return await this.bio.getBio(req);
  }
}
