import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @Matches(/^[\x20-\x7E]+$/, { message: 'Email must not contain emojis' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
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
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  @Matches(/^[\x20-\x7E]+$/, { message: 'First name must not contain emojis' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  @Matches(/^[\x20-\x7E]+$/, { message: 'Last name must not contain emojis' })
  lastName: string;
}
