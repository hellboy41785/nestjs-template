declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    jwtSecretKey: string;
    jwtAdminSecretKey: string;
    jwtRefreshTokenKey: string;
    ACCESS_TOKEN_EXPIRY_DATE: string;
    REFRESH_TOKEN_EXPIRY_DATE: string;
    jwtMentorSecretKey: string;
    jwtOtpSecretKey: string;
    OTP_TOKEN_EXPIRY_DATE: string;
    MAIL_HOST: string;
    MAIL_PORT: string;
    MAIL_USER: string;
    MAIL_PASSWORD: string;
    MAIL_SENDER: string;
    COMPANY_NAME: string;
    VERIFY_CLIENT_EMAIL_URL: string;
    VERIFY_MENTOR_EMAIL_URL: string;
    MINIO_ENDPOINT: string;
    MINIO_PORT: string;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;
    MINIO_USE_SSL: string;
    MINIO_BUCKET_NAME: string;
    PORT: string;
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
    BUCKET_NAME: string;
    OPEN_AI_SECRET_KEY: string;
    PDF_SERVICES_CLIENT_ID: string;
    PDF_SERVICES_CLIENT_SECRET: string;
  }
}
