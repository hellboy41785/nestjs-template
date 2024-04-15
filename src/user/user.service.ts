import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/utils/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { VerifyOtpDto } from 'src/otp/dto/otp.dto';
import { OtpService } from 'src/otp/otp.service';
import { compare } from 'bcrypt';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private otpService: OtpService,
    private jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('email duplicated');

    const newUser = await this.prisma.user.create({
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

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

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
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DATE,
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async otherLogin(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
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
            secret: process.env.jwtSecretKey,
          }),
          refreshToken: await this.jwtService.signAsync(payload, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DATE,
            secret: process.env.jwtRefreshTokenKey,
          }),
          expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        },
      };

    const newUser = await this.prisma.user.create({
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
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DATE,
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.findByEmail(dto.email);

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
        secret: process.env.jwtSecretKey,
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
    const user = await this.prisma.user.update({
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
