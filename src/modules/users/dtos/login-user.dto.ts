import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @Matches(/^[\x20-\x7E]+$/, { message: 'Email must not contain emojis' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^[\x20-\x7E]+$/, { message: 'Password must not contain emojis' })
  password: string;
}
