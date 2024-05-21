import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResumeService } from './resume.service.js';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nest-lab/fastify-multer';

const FILE_SIZE = 25 * 1024 * 1024;

@ApiTags('resume')
@Controller('resume')
export class ResumeController {
  constructor(private resume: ResumeService) {}

  @Post('/reviewer')
  @ApiOperation({ summary: 'Uploads a pdf or docx file' })
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
          description: 'Maximum file size is 25 MB',
        },
      },
    },
  })
  async resumeReviewer(@UploadedFile() file: Express.Multer.File) {
    return await this.resume.resumeReviewer(file);
  }

  @Post('/pdf-to-txt')
  @ApiOperation({ summary: 'Uploads a pdf or docx file' })
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
          description: 'Maximum file size is 25 MB',
        },
      },
    },
  })
  async pdfToTxt(@UploadedFile() file: Express.Multer.File) {
    return await this.resume.pdfToText(file);
  }
}
