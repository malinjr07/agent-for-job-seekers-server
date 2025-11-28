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
  All,
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
   * Generate fake users
   */
  @Get('generators')
  @HttpCode(HttpStatus.OK)
  async generateUsers(): Promise<UserResponseDto[]> {
    return this.usersService.generateFakeUsers();
  }

  /**
   * Get user by ID
   */
  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  /**
   * Update user
   */
  @Patch('single/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Soft delete user
   */
  @Delete('single/:id')
  @HttpCode(HttpStatus.OK)
  async softDelete(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.softDelete(id);
  }

  @All()
  @All('*')
  @HttpCode(HttpStatus.NOT_FOUND)
  handleInvalidRequests() {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Invalid users endpoint or HTTP method',
    };
  }
}
