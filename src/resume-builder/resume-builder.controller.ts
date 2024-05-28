import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResumeBuilderService } from './resume-builder.service';
import { ExperienceDto, SummaryDto } from './dto/resume-builder.dto';

@ApiTags('resume-builder')
@Controller('resume-builder')
export class ResumeBuilderController {
  constructor(private resumeBuilder: ResumeBuilderService) {}

  @Post('/experience')
  async experience(@Body() dto: Array<ExperienceDto>) {
    return this.resumeBuilder.experience(dto);
  }
  @Post('/summary')
  async summary(@Body() dto: SummaryDto) {
    return this.resumeBuilder.summary(dto);
  }
  @Post('/project')
  async project(@Body() dto: Array<[any]>) {
    return this.resumeBuilder.project(dto);
  }
  @Post('/leadership')
  async leadership(@Body() dto: Array<[any]>) {
    return this.resumeBuilder.leadership(dto);
  }
  @Post('/certification')
  async certification(@Body() dto: Array<[any]>) {
    return this.resumeBuilder.certification(dto);
  }
}
