import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EmailTemplatesService } from './email-templates.service';
import { CreateEmailTemplateDto } from './dtos/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dtos/update-email-template.dto';
import { EmailTemplateResponseDto } from './dtos/email-template-response.dto';

@Controller('templates')
export class EmailTemplatesController {
  constructor(private readonly emailTemplatesService: EmailTemplatesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateEmailTemplateDto,
  ): Promise<{ template: EmailTemplateResponseDto }> {
    const template = await this.emailTemplatesService.create(body);
    return { template };
  }

  @Get()
  async findAll(
    @Query('userId') userId: string,
  ): Promise<{ templates: EmailTemplateResponseDto[] }> {
    const templates = await this.emailTemplatesService.findAllByUser(userId);
    return { templates };
  }

  @Put('single/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateEmailTemplateDto,
  ): Promise<EmailTemplateResponseDto> {
    return this.emailTemplatesService.update(id, body);
  }

  @Delete('single/:id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<EmailTemplateResponseDto> {
    return this.emailTemplatesService.remove(id);
  }
}
