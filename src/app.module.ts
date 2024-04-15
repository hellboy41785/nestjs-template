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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    MentorService,
    JwtService,
    OtpService,
    MailerService,
  ],
})
export class AppModule {}
