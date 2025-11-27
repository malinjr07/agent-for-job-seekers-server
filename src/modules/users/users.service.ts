import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import type { User } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    email,
    password,
    firstName,
    lastName,
  }: CreateUserDto): Promise<User> {
    console.log('Payload', {
      email,
      password,
      firstName,
      lastName,
    });

    const passwordHash: string = await hash(password, {
      timeCost: 3,
      memoryCost: 12288, // 12 MB
      parallelism: 1,
      type: 2,
    });

    console.log('passwordHash', passwordHash);

    return this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
      },
    });
  }
}
