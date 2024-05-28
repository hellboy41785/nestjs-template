import { Module } from '@nestjs/common';
import { ResumeBuilderController } from './resume-builder.controller';
import { ResumeBuilderService } from './resume-builder.service';
import { OpenAIService } from 'src/utils/openai.service';

@Module({
  controllers: [ResumeBuilderController],
  providers: [ResumeBuilderService, OpenAIService],
})
export class ResumeBuilderModule {}
