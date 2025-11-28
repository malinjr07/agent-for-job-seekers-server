import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import type { User, UserStatus } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { PaginatedUsersResponseDto } from './dtos/paginated-users-response.dto';
import { hash, verify } from 'argon2';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Create a new user
   */
  async create({
    email,
    password,
    firstName,
    lastName,
    handle,
  }: CreateUserDto): Promise<UserResponseDto> {
    // Check if email already exists
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Check if handle already exists
    const existingHandle = await this.prisma.user.findUnique({
      where: { handle: handle.toLowerCase() },
    });
    if (existingHandle) {
      throw new ConflictException('Handle already exists');
    }

    const passwordHash: string = await hash(password, {
      timeCost: 3,
      memoryCost: 12288, // 12 MB
      parallelism: 1,
      type: 2,
    });

    const user = await this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        handle: handle.toLowerCase(),
        status: 'VERIFICATION_PENDING',
        statusUpdatedAt: new Date(),
      },
    });

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Find all users with pagination, search, and filtering
   */
  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: UserStatus,
  ): Promise<PaginatedUsersResponseDto> {
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { handle: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    const userDtos = users.map((user) =>
      plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );

    return new PaginatedUsersResponseDto(userDtos, total, page, limit);
  }

  /**
   * Find a single user by ID
   */
  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Update a user
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updateData: any = {};

    if (updateUserDto.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email.toLowerCase() },
      });
      if (existingEmail && existingEmail.id !== id) {
        throw new ConflictException('Email already exists');
      }
      updateData.email = updateUserDto.email.toLowerCase();
    }

    if (updateUserDto.handle) {
      const existingHandle = await this.prisma.user.findUnique({
        where: { handle: updateUserDto.handle.toLowerCase() },
      });
      if (existingHandle && existingHandle.id !== id) {
        throw new ConflictException('Handle already exists');
      }
      updateData.handle = updateUserDto.handle.toLowerCase();
    }

    if (updateUserDto.password) {
      updateData.passwordHash = await hash(updateUserDto.password, {
        timeCost: 3,
        memoryCost: 12288,
        parallelism: 1,
        type: 2,
      });
    }

    if (updateUserDto.firstName) {
      updateData.firstName = updateUserDto.firstName.toLowerCase();
    }

    if (updateUserDto.lastName) {
      updateData.lastName = updateUserDto.lastName.toLowerCase();
    }

    // Update status and statusUpdatedAt if status is being changed
    if (updateUserDto.status && updateUserDto.status !== user.status) {
      updateData.status = updateUserDto.status;
      updateData.statusUpdatedAt = new Date();
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Soft delete a user by setting status to DELETED
   */
  async softDelete(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const deletedUser = await this.prisma.user.update({
      where: { id },
      data: {
        status: 'DELETED',
        statusUpdatedAt: new Date(),
      },
    });

    return plainToInstance(UserResponseDto, deletedUser, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Login user and return JWT token
   */
  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.verifyPassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is not deleted
    if (user.status === 'DELETED') {
      throw new UnauthorizedException('Account has been deleted');
    }

    const token = this.generateToken(user);
    const userDto = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return new LoginResponseDto(userDto, token);
  }

  /**
   * Verify password against hash
   */
  private async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    try {
      return await verify(hash, password);
    } catch {
      return false;
    }
  }

  /**
   * Generate JWT token for user
   */
  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      handle: user.handle,
    };

    return this.jwtService.sign(payload);
  }
}
