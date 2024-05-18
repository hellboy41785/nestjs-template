import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { OpenAIService } from 'src/utils/openai.service';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService, OpenAIService],
})
export class ResumeModule {}
