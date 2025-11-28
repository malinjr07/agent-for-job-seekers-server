import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { PaginatedUsersResponseDto } from './dtos/paginated-users-response.dto';
import { UserStatus } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * User registration endpoint
   */
  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(body);
  }

  /**
   * User login endpoint
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginUserDto): Promise<LoginResponseDto> {
    return this.usersService.login(body.email, body.password);
  }

  /**
   * List all users with pagination, search, and filtering
   */
  @Get('list')
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('status') status?: UserStatus,
  ): Promise<PaginatedUsersResponseDto> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;

    return this.usersService.findAll(pageNum, limitNum, search, status);
  }

  /**
   * Get user by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  /**
   * Update user
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Soft delete user
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async softDelete(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.softDelete(id);
  }
}
