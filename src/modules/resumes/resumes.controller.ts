import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dtos/create-resume.dto';
import { UpdateResumeDto } from './dtos/update-resume.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { CurrentUser } from '@decorators/current-user.decorator';
import type { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@CurrentUser() user: User, @Body() body: CreateResumeDto) {
    const resume = await this.resumesService.create(user.id, body);
    return { resume };
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    const resumes = await this.resumesService.findAllForUser(user.id);
    return { resumes };
  }

  @Put('single/:id')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() body: UpdateResumeDto,
  ) {
    return this.resumesService.update(id, user.id, body);
  }

  @Post('single/:id/generate-pdf')
  @HttpCode(HttpStatus.OK)
  async generatePdf(@Param('id') id: string, @CurrentUser() user: User) {
    return this.resumesService.generatePdf(id, user.id);
  }
}
