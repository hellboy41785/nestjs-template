import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, MentorDto } from './dto/mentor.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/utils/prisma.service';
import { hash } from 'bcrypt';
import { VerifyOtpDto } from 'src/otp/dto/otp.dto';
import { OtpService } from 'src/otp/otp.service';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class MentorService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private otpService: OtpService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
      },
    };
    if (!user.emailVerified) {
      await this.otpService.generateOTPToken({
        email: user.email,
        url: process.env.VERIFY_CLIENT_EMAIL_URL,
      });
      throw new UnauthorizedException('Your Email is not verified');
    }
    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY_DATE,
          secret: process.env.jwtMentorSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DATE,
          secret: process.env.jwtMentorSecretKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async otherLogin(dto: MentorDto) {
    const user = await this.prisma.mentor.findUnique({
      where: {
        email: dto.email,
      },
    });
    const payload = {
      email: dto.email,
      sub: {
        name: dto.name,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user ?? { password: null };
    if (user)
      return {
        user: result,
        backendTokens: {
          accessToken: await this.jwtService.signAsync(payload, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY_DATE,
            secret: process.env.jwtMentorSecretKey,
          }),
          refreshToken: await this.jwtService.signAsync(payload, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DATE,
            secret: process.env.jwtRefreshTokenKey,
          }),
          expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        },
      };

    const newUser = await this.prisma.mentor.create({
      data: {
        ...dto,
      },
    });
    if (!newUser) throw new ConflictException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ...newResult } = newUser;
    return {
      user: newResult,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY_DATE,
          secret: process.env.jwtMentorSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DATE,
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }
  async register(dto: MentorDto) {
    const user = await this.prisma.mentor.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('Email duplicated');

    const newUser = await this.prisma.mentor.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    const otp = await this.otpService.generateOTPToken({
      email: result.email,
      url: process.env.VERIFY_CLIENT_EMAIL_URL,
    });
    return {
      token: otp.token,
      status: 'Ok',
      message: 'Verify your email address',
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.prisma.mentor.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user && (await compare(dto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Wrong email or password');
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY_DATE,
        secret: process.env.jwtMentorSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DATE,
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async verifyEmail(dto: VerifyOtpDto) {
    const verify = await this.otpService.verifyOTPToken(dto);
    const user = await this.prisma.mentor.update({
      where: {
        email: verify.email,
      },
      data: {
        emailVerified: true,
      },
    });
    if (!user) throw new UnauthorizedException('user is not registered');

    return { status: 'OK', message: 'User Email Verified' };
  }
}
