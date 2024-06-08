import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { RefreshJwtGuard } from 'src/guards/refresh.guard';
import { VerifyOtpDto } from 'src/otp/dto/otp.dto';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.userService.login(dto);
  }
  @Post('google')
  async otherLogin(@Body() dto: CreateUserDto) {
    return await this.userService.googleLogin(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.userService.refreshToken(req.user);
  }

  @Post('verify')
  async verifyEmail(@Body() dto: VerifyOtpDto) {
    return await this.userService.verifyEmail(dto);
  }
}
