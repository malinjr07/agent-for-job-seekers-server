import { UserResponseDto } from './user-response.dto';

export class LoginResponseDto {
  user: UserResponseDto;
  token: string;

  constructor(user: UserResponseDto, token: string) {
    this.user = user;
    this.token = token;
  }
}
