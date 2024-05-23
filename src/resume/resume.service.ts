import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OpenAIService } from 'src/utils/openai.service';
import { system_message, user_message } from 'src/utils/gpt';
import { MediaService } from 'src/media/media.service';
// import * as mammoth from 'mammoth';
// import * as puppeteer from 'puppeteer';
// import * as pdfParse from 'pdf-parse';

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
      const text = await this.documentToText(file);

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

      const resume = await this.pdfUrl(file);

      return {
        resume_url: resume.url,
        resume_report: report,
      };
    } catch (error) {
      throw new UnprocessableEntityException({ message: 'Invalid pdf type' });
    }
  }

  async documentToText(file: Express.Multer.File) {
    try {
      if (file.mimetype === 'application/pdf') {
        const formdata = new FormData();
        const fileBlob = new Blob([file.buffer], { type: file.mimetype });
        formdata.append('fileInput', fileBlob, file.originalname);
        formdata.append('outputFormat', 'txt');
        const options = {
          method: 'POST',
          body: formdata,
          headers: {
            'X-API-KEY': process.env.PDF_API_KEY,
          },
        };
        const res = await fetch(
          `${process.env.PDF_API_URL}/convert/pdf/text`,
          options,
        );
        const data = await res.text();

        return data;
      } else {
        const docx = await this.docxToPdf(file);
        const formdata = new FormData();
        const fileBlob = new Blob([docx.buffer], { type: docx.mimetype });
        formdata.append('fileInput', fileBlob, docx.originalname);
        formdata.append('outputFormat', 'txt');
        const options = {
          method: 'POST',
          body: formdata,
          headers: {
            'X-API-KEY': process.env.PDF_API_KEY,
          },
        };
        const res = await fetch(
          `${process.env.PDF_API_URL}/convert/pdf/text`,
          options,
        );
        const data = await res.text();

        return data;
      }
    } catch (error) {
      throw new UnprocessableEntityException({
        message: 'Invalid pdf or docx type',
      });
    }
  }

  async docxToPdf(file: Express.Multer.File) {
    try {
      const formdata = new FormData();
      const fileBlob = new Blob([file.buffer], { type: file.mimetype });
      formdata.append('fileInput', fileBlob, file.originalname);
      const options = {
        method: 'POST',
        body: formdata,
        headers: {
          'X-API-KEY': process.env.PDF_API_KEY,
        },
      };
      const res = await fetch(
        `${process.env.PDF_API_URL}/convert/file/pdf`,
        options,
      );
      const pdfBuffer = Buffer.from(await res.arrayBuffer());
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
      console.log(error);
      throw new UnprocessableEntityException({
        message: 'Invalid  docx type',
      });
    }
  }

  async pdfUrl(file: Express.Multer.File) {
    if (file.mimetype === 'application/pdf') {
      const resume = await this.media.uploadFile(file, 'resume');
      return resume;
    } else {
      const docxToPdf = await this.docxToPdf(file);
      const resume = await this.media.uploadFile(docxToPdf, 'resume');
      return resume;
    }
  }
}
