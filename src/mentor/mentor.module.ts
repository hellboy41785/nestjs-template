import { Module } from '@nestjs/common';
import { MentorController } from './mentor.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/utils/prisma.service';
import { MentorService } from './mentor.service';
import { OtpService } from 'src/otp/otp.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  controllers: [MentorController],
  providers: [
    MentorService,
    PrismaService,
    JwtService,
    OtpService,
    MailerService,
  ],
})
export class MentorModule {}
