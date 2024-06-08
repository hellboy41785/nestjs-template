import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './utils/prisma.service';
import { MentorService } from './mentor/mentor.service';
import { MentorModule } from './mentor/mentor.module';
import { JwtService } from '@nestjs/jwt';
import { MailerModule } from './mailer/mailer.module';
import { OtpService } from './otp/otp.service';
import { OtpModule } from './otp/otp.module';
import { MailerService } from './mailer/mailer.service';
import { MediaModule } from './media/media.module';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { ContentLibraryModule } from './content-library/content-library.module';
import { AvailabilityModule } from './availability/availability.module';
import { BioModule } from './bio/bio.module';
import { AdminModule } from './admin/admin.module';
import { ServicesModule } from './services/services.module';
import { ResumeModule } from './resume/resume.module';
import { ResumeBuilderModule } from './resume-builder/resume-builder.module';
import { APP_FILTER } from '@nestjs/core';
import { UnknownExceptionFilter } from './error/unknown-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    MentorModule,
    MailerModule,
    OtpModule,
    MediaModule,
    FastifyMulterModule,

    ContentLibraryModule,

    AvailabilityModule,

    BioModule,

    AdminModule,

    ServicesModule,

    ResumeModule,

    ResumeBuilderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    MentorService,
    JwtService,
    OtpService,
    MailerService,
    {
      provide: APP_FILTER,
      useClass: UnknownExceptionFilter,
    },
  ],
})
export class AppModule {}
