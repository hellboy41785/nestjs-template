import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { OpenAIService } from 'src/utils/openai.service';
import { MediaService } from 'src/media/media.service';
import { SupabaseService } from 'src/utils/supabase.service';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService, OpenAIService, MediaService, SupabaseService],
})
export class ResumeModule {}
