import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LoginDto, MentorDto } from './dto/mentor.dto';
import { RefreshJwtGuard } from '../guards/refresh.guard';
import { ApiTags } from '@nestjs/swagger';
import { MentorService } from './mentor.service';
import { VerifyOtpDto } from 'src/otp/dto/otp.dto';
@ApiTags('mentor')
@Controller('mentor')
export class MentorController {
  constructor(private mentorService: MentorService) {}
  @Post('register')
  async registerUser(@Body() dto: MentorDto) {
    return await this.mentorService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.mentorService.login(dto);
  }
  @Post('other-login')
  async otherLogin(@Body() dto: MentorDto) {
    return await this.mentorService.otherLogin(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.mentorService.refreshToken(req.user);
  }

  @Post('verify')
  async verifyEmail(@Body() dto: VerifyOtpDto) {
    return await this.mentorService.verifyEmail(dto);
  }
}
