import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResumeService } from './resume.service.js';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { MediaService } from 'src/media/media.service';

const FILE_SIZE = 2 * 1024 * 1024;

@ApiTags('resume')
@Controller('resume')
export class ResumeController {
  constructor(
    private resume: ResumeService,
    private media: MediaService,
  ) {}

  @Post('/reviewer')
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
  async resumeReviewer(@UploadedFile() file: Express.Multer.File) {
    return await this.resume.resumeReviewer(file);
  }

  @Post('/document-to-text')
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
  async documentToText(@UploadedFile() file: Express.Multer.File) {
    return await this.resume.documentToText(file);
  }

  @Post('/docx-to-pdf')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: FILE_SIZE },
    }),
  )
  @ApiOperation({ summary: 'Only DOCX files are allowed' })
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
  async docxToPdf(@UploadedFile() file: Express.Multer.File) {
    const response = await this.resume.docxToPdf(file);

    const resume = await this.media.uploadFile(response, 'docx-to-pdf');

    return resume;
  }
}
