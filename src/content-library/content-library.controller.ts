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
import { JwtMentor } from 'src/guards/jwt.mentor.guard';
import { Request } from 'express';
import { ContentLibraryService } from './content-library.service';
import {
  CreateContentLibraryDto,
  UpdateContentLibraryDto,
} from './dto/content-library.dto';

@ApiTags('Content Library')
@Controller('content-library')
export class ContentLibraryController {
  constructor(private contentLibraryService: ContentLibraryService) {}

  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @Get('all')
  async getContentLibraries(@Req() req: Request) {
    return await this.contentLibraryService.getContentLibraries(req);
  }
  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @Get('/:id')
  async getContentLibrariesById(@Param('id') id: string) {
    return await this.contentLibraryService.getContentLibrariesById(id);
  }
  @UseGuards(JwtMentor)
  @ApiBearerAuth()
  @Post('create')
  async createContentLibrary(
    @Req() req: Request,
    @Body() dto: CreateContentLibraryDto,
  ) {
    return await this.contentLibraryService.createContentLibrary(req, dto);
  }

  @UseGuards(JwtMentor)
  @Patch('update')
  @ApiQuery({ name: 'id', required: true })
  @ApiBearerAuth()
  async updateContentLibrary(
    @Req() req: Request,
    @Body() dto: UpdateContentLibraryDto,
  ) {
    return await this.contentLibraryService.updateContentLibrary(req, dto);
  }

  @UseGuards(JwtMentor)
  @Delete('delete')
  @ApiQuery({ name: 'id', required: true })
  @ApiBearerAuth()
  async deleteContentLibrary(@Req() req: Request) {
    return await this.contentLibraryService.deleteContentLibrary(req);
  }
}
