import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OpenAIService } from 'src/utils/openai.service';
import { system_message, user_message } from 'src/utils/gpt';
import { MediaService } from 'src/media/media.service';
import * as mammoth from 'mammoth';
import * as puppeteer from 'puppeteer';
import * as pdfParse from 'pdf-parse';

import { Readable } from 'stream';
@Injectable()
export class ResumeService {
  private openai = this.openAIService.getClient();
  constructor(
    private openAIService: OpenAIService,
    private media: MediaService,
  ) {}

  async resumeReviewer(file: Express.Multer.File) {
    try {
      const data = await this.pdfToText(file);

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
             ${data.text}
             
             ${user_message}
            `,
          },
        ],
      });
      const report = JSON.parse(response.choices[0].message.content);

      if (report.message === 'Invalid resume') {
        throw new UnprocessableEntityException(report);
      }

      if (data.type === 'docx') {
        const docxToPdf = await this.docxToPdf(file);
        const resume = await this.media.uploadFile(docxToPdf, 'resume');

        return {
          resume_url: resume.url,
          type: docxToPdf.mimetype,
          resume_report: report,
        };
      }

      const resume = await this.media.uploadFile(file, 'resume');

      return {
        resume_url: resume.url,
        type: data.type,
        resume_report: report,
      };
    } catch (error) {
      throw new UnprocessableEntityException({ message: 'Invalid pdf type' });
    }
  }

  async pdfToText(file: Express.Multer.File) {
    try {
      if (file.mimetype === 'application/pdf') {
        const data = await pdfParse(file.buffer);
        return {
          type: 'pdf',
          text: data.text,
        };
      } else {
        const text = await mammoth.extractRawText({ buffer: file.buffer });

        const lines = text.value.split('\n');

        return {
          type: 'docx',
          text: lines,
        };
      }
    } catch (error) {
      throw new UnprocessableEntityException({
        message: 'Invalid pdf or docx type',
      });
    }
  }

  async docxToPdf(file: Express.Multer.File) {
    try {
      const { value: htmlContent } = await mammoth.convertToHtml({
        buffer: file.buffer,
      });
      const browser = await puppeteer.launch({
        headless: false,
        args: ['--headless'],
      });
      const page = await browser.newPage();
      await page.setContent(htmlContent);
      const pdfBuffer = await page.pdf();
      await browser.close();

      const stream = Readable.from(pdfBuffer);

      const pdfFile: Express.Multer.File = {
        fieldname: file.fieldname,
        originalname: `${file.originalname.replace(/\.[^/.]+$/, '')}.pdf`,
        encoding: '7bit',
        mimetype: 'application/pdf',
        size: pdfBuffer.length,
        destination: '', // Destination is not applicable for this use case
        filename: `${file.originalname.replace(/\.[^/.]+$/, '')}.pdf`,
        path: '', // Path is not applicable since we're not saving the file
        buffer: pdfBuffer,
        stream: stream,
      };

      return pdfFile;
    } catch (error) {
      throw new UnprocessableEntityException({
        message: 'Invalid  docx type',
      });
    }
  }
}
