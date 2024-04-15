import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MediaService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: Number(process.env.MINIO_PORT),
      useSSL: process.env.MINIO_USE_SSL === 'true' ? true : false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
    this.bucketName = process.env.MINIO_BUCKET_NAME;
  }

  async uploadFile(file: Express.Multer.File, folder: string) {
    await this.bucketPolicy();
    const fileName = `${folder}/${file.originalname}`;
    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
    );

    const url = await this.getFileUrl(fileName);

    return {
      status: 'OK',
      url: url.trim().split('?')[0],
    };
  }
  async uploadFiles(files: Array<Express.Multer.File>, folder: string) {
    if (files.length > 10)
      throw new BadRequestException('Maximum number of files allowed is 10');
    await this.bucketPolicy();
    const uploadPromises = files.map(async (file) => {
      const fileName = `${folder}/${file.originalname}`;
      await this.minioClient.putObject(
        this.bucketName,
        fileName,
        file.buffer,
        file.size,
      );

      const url = await this.getFileUrl(fileName);
      return url.trim().split('?')[0];
    });

    const results = await Promise.all(uploadPromises);

    return {
      status: 'OK',
      url: results,
    };
  }

  async getFileUrl(fileName: string) {
    return await this.minioClient.presignedUrl(
      'GET',
      this.bucketName,
      fileName,
    );
  }

  async bucketPolicy() {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: ['arn:aws:s3:::' + this.bucketName + '/*'],
        },
      ],
    };
    await this.minioClient.setBucketPolicy(
      this.bucketName,
      JSON.stringify(policy),
    );
  }
}
