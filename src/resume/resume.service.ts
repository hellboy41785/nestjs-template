import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OpenAIService } from 'src/utils/openai.service';
import * as pdfParse from 'pdf-parse';
import { system_message, user_message } from 'src/utils/gpt';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class ResumeService {
  private openai = this.openAIService.getClient();
  private readonly logger = new Logger(ResumeService.name);
  constructor(
    private openAIService: OpenAIService,
    private media: MediaService,
  ) {}

  async resumeReviewer(file: Express.Multer.File) {
    try {
      const text = await this.pdfToText(file);

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: system_message,
          },
          {
            role: 'user',
            content: `
             ${text}
             
             ${user_message}
            `,
          },
        ],
      });
      const report = JSON.parse(response.choices[0].message.content);

      if (report.message === 'Invalid resume') {
        throw new UnprocessableEntityException(report);
      }

      const resume = await this.media.uploadFile(file, 'resume');

      return {
        resume_url: resume.url,
        resume_report: report,
      };
    } catch (error) {
      throw new UnprocessableEntityException({ message: 'Invalid pdf type' });
    }
  }

  async pdfToText(file: Express.Multer.File) {
    try {
      const data = await pdfParse(file.buffer);
      return data.text;
    } catch (error) {
      throw new Error('Failed to extract text from PDF');
    }
  }
}
