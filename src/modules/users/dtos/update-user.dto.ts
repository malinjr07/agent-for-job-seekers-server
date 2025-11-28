import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  IsStrongPassword,
} from 'class-validator';
import { UserStatus } from '@prisma/client';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @Matches(/^[\x20-\x7E]+$/, { message: 'Email must not contain emojis' })
  email?: string;

  @IsString()
  @IsOptional()
  @Length(10, 16, { message: 'Password must be between 10 and 16 characters' })
  @IsStrongPassword(
    {
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    },
  )
  @Matches(/^[\x20-\x7E]+$/, { message: 'Password must not contain emojis' })
  password?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[\x20-\x7E]+$/, { message: 'First name must not contain emojis' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[\x20-\x7E]+$/, { message: 'Last name must not contain emojis' })
  lastName?: string;

  @IsString()
  @IsOptional()
  @Length(3, 50, { message: 'Handle must be between 3 and 50 characters' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Handle can only contain letters, numbers, underscores, and hyphens',
  })
  handle?: string;

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}
