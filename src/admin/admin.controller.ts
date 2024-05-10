import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshJwtGuard } from 'src/guards/refresh.guard';
import { CreateUserDto, LoginDto } from './dto/admin.dto';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private admin: AdminService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.admin.findById(id);
  }

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.admin.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.admin.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.admin.refreshToken(req.user);
  }
}
