import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateEmailTemplateDto } from './dtos/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dtos/update-email-template.dto';
import { EmailTemplateResponseDto } from './dtos/email-template-response.dto';

@Injectable()
export class EmailTemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDto: CreateEmailTemplateDto,
  ): Promise<EmailTemplateResponseDto> {
    const template = await this.prisma.emailTemplate.create({
      data: {
        userId: createDto.userId,
        name: createDto.name,
        templateBody: createDto.templateBody,
        variables: createDto.variables,
      },
    });

    return plainToInstance(EmailTemplateResponseDto, template, {
      excludeExtraneousValues: true,
    });
  }

  async findAllByUser(userId: string): Promise<EmailTemplateResponseDto[]> {
    const templates = await this.prisma.emailTemplate.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return templates.map((template) =>
      plainToInstance(EmailTemplateResponseDto, template, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async update(
    id: string,
    updateDto: UpdateEmailTemplateDto,
  ): Promise<EmailTemplateResponseDto> {
    const existing = await this.prisma.emailTemplate.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Email template with ID ${id} not found`);
    }

    const updated = await this.prisma.emailTemplate.update({
      where: { id },
      data: {
        name: updateDto.name ?? existing.name,
        templateBody: updateDto.templateBody ?? existing.templateBody,
        variables:
          typeof updateDto.variables !== 'undefined'
            ? updateDto.variables
            : existing.variables,
      },
    });

    return plainToInstance(EmailTemplateResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<EmailTemplateResponseDto> {
    const existing = await this.prisma.emailTemplate.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Email template with ID ${id} not found`);
    }

    const deleted = await this.prisma.emailTemplate.delete({
      where: { id },
    });

    return plainToInstance(EmailTemplateResponseDto, deleted, {
      excludeExtraneousValues: true,
    });
  }
}
