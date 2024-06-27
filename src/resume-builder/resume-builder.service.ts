import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OpenAIService } from 'src/utils/openai.service';
import { ExperienceDto, SummaryDto } from './dto/resume-builder.dto';
import {
  system_message_experience,
  user_message_experience,
} from 'src/prompts/builder/experience';
import {
  system_message_summary,
  user_message_summary,
} from 'src/prompts/builder/summary';
import {
  system_message_project,
  user_message_project,
} from 'src/prompts/builder/project';
import {
  system_message_leadership,
  user_message_leadership,
} from 'src/prompts/builder/leadership';
import {
  system_message_certification,
  user_message_certification,
} from 'src/prompts/builder/certification';
import { ResumeService } from 'src/resume/resume.service';
import {
  system_resume_extractor,
  user_resume_extractor,
} from 'src/prompts/builder/extractor';

@Injectable()
export class ResumeBuilderService {
  constructor(
    private openAIService: OpenAIService,
    private resumeService: ResumeService,
  ) {}
  private openai = this.openAIService.getClient();
  async experience(dto: ExperienceDto[]) {
    const data = await this.chatGpt(
      user_message_experience,
      system_message_experience,
      JSON.stringify(dto),
    );
    return data.experience;
  }

  async summary(dto: SummaryDto) {
    const data = await this.chatGpt(
      user_message_summary,
      system_message_summary,
      dto.summary,
    );
    return data;
  }

  async project(dto: any) {
    const data = await this.chatGpt(
      user_message_project,
      system_message_project,
      JSON.stringify(dto),
    );
    return data.projects;
  }
  async leadership(dto: any) {
    const data = await this.chatGpt(
      user_message_leadership,
      system_message_leadership,
      JSON.stringify(dto),
    );
    return data.leadership;
  }
  async certification(dto: any) {
    const data = await this.chatGpt(
      user_message_certification,
      system_message_certification,
      JSON.stringify(dto),
    );
    return data.certifications;
  }

  async extractor(file: Express.Multer.File) {
    const resumeInfo = await this.resumeService.documentToText(file);
    const data = await this.chatGpt(
      user_resume_extractor,
      system_resume_extractor,
      resumeInfo,
    );
    return data;
  }

  async chatGpt(user: string, system: string, query: any) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: system,
        },
        {
          role: 'user',
          content: `                      
          ${user}

          ${query}     
            `,
        },
      ],
    });
    const report = JSON.parse(response.choices[0].message.content);

    if (report.message === 'Invalid format') {
      throw new UnprocessableEntityException(report);
    }

    return report;
  }
}
