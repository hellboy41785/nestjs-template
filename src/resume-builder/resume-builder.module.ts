import { Module } from '@nestjs/common';
import { ResumeBuilderController } from './resume-builder.controller';
import { ResumeBuilderService } from './resume-builder.service';
import { OpenAIService } from 'src/utils/openai.service';
import { ResumeService } from 'src/resume/resume.service';
import { MediaService } from 'src/media/media.service';
import { SupabaseService } from 'src/utils/supabase.service';

@Module({
  controllers: [ResumeBuilderController],
  providers: [
    ResumeBuilderService,
    OpenAIService,
    ResumeService,
    MediaService,
    SupabaseService,
  ],
})
export class ResumeBuilderModule {}
