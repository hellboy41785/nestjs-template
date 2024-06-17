import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResumeBuilderService } from './resume-builder.service';
import { ExperienceDto, SummaryDto } from './dto/resume-builder.dto';
import { FileInterceptor } from '@nest-lab/fastify-multer';

const FILE_SIZE = 2 * 1024 * 1024;
@ApiTags('resume-builder')
@Controller('resume-builder')
export class ResumeBuilderController {
  constructor(private resumeBuilder: ResumeBuilderService) {}

  @Post('/experience')
  async experience(@Body() dto: Array<ExperienceDto>) {
    return this.resumeBuilder.experience(dto);
  }
  @Post('/summary')
  async summary(@Body() dto: SummaryDto) {
    return this.resumeBuilder.summary(dto);
  }
  @Post('/project')
  async project(@Body() dto: Array<[any]>) {
    return this.resumeBuilder.project(dto);
  }
  @Post('/leadership')
  async leadership(@Body() dto: Array<[any]>) {
    return this.resumeBuilder.leadership(dto);
  }
  @Post('/certification')
  async certification(@Body() dto: Array<[any]>) {
    return this.resumeBuilder.certification(dto);
  }

  @Post('/extractor')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: FILE_SIZE },
    }),
  )
  @ApiOperation({ summary: 'Only PDF and DOCX files are allowed' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: FILE_SIZE } }))
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          maxLength: FILE_SIZE,
          description: 'Maximum file size is 2 MB',
        },
      },
    },
  })
  async extractor(@UploadedFile() file: Express.Multer.File) {
    return this.resumeBuilder.extractor(file);
  }
}
