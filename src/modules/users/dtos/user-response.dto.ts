import { Exclude, Expose } from 'class-transformer';

@Expose()
export class UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  handle: string;
  status: string;
  statusUpdatedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  passwordHash: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
