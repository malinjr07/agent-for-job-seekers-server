import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import type { Lead, LeadSources } from '@prisma/generated';
import { CreateLeadDto, CreateLeadDataDto } from '../dtos/create-lead.dto';
import { BulkCreateLeadDto } from '../dtos/bulk-create-lead.dto';
import { UpdateLeadDto } from '../dtos/update-lead.dto';
import { BulkDeleteLeadsDto } from '../dtos/bulk-delete-leads.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create or update a single lead
   */
  async create(userId: string, { data }: CreateLeadDto): Promise<Lead> {
    // Validate leadSource exists and belongs to user
    const leadSource = await this.prisma.leadSources.findFirst({
      where: { id: data.leadSourceId, userId },
    });
    if (!leadSource) {
      throw new BadRequestException('Invalid lead source');
    }

    // Upsert based on emailAddress
    return this.prisma.lead.upsert({
      where: { emailAddress: data.emailAddress },
      update: {
        ...data,
        leadSourceId: data.leadSourceId,
      },
      create: {
        ...data,
        userId,
        leadSourceId: data.leadSourceId,
      },
    });
  }

  /**
   * Bulk create or update leads
   */
  async bulkCreate(
    userId: string,
    { source, leadSourceId, leads, requiredFieldMapping }: BulkCreateLeadDto,
  ): Promise<{
    createdCount: number;
    updatedCount: number;
    skippedCount: number;
    errors: { rowIndex: number; reason: string }[];
  }> {
    // Validate max per request
    if (leads.length > 10000) {
      throw new BadRequestException('Maximum 10,000 leads per request');
    }

    // Rate limit: check leads created in last 30 min
    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);
    const recentCount = await this.prisma.lead.count({
      where: {
        userId,
        createdAt: { gte: thirtyMinAgo },
      },
    });
    if (recentCount + leads.length > 10000) {
      throw new BadRequestException(
        'Rate limit exceeded: max 10,000 leads per 30 minutes',
      );
    }

    // Validate leadSource
    const leadSource = await this.prisma.leadSources.findFirst({
      where: { id: leadSourceId, userId },
    });
    if (!leadSource) {
      throw new BadRequestException('Invalid lead source');
    }

    let createdCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    const errors: { rowIndex: number; reason: string }[] = [];

    for (let i = 0; i < leads.length; i++) {
      const leadData = leads[i].data;
      const email = leadData[requiredFieldMapping.email];
      const companyName = leadData[requiredFieldMapping.companyName];

      if (!email || !companyName) {
        skippedCount++;
        errors.push({ rowIndex: i, reason: 'Missing required fields' });
        continue;
      }

      // Map to canonical fields
      const canonicalData: Omit<CreateLeadDataDto, 'leadSourceId'> = {
        emailAddress: email,
        companyName,
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        fullName: leadData.fullName,
      };

      try {
        const existing = await this.prisma.lead.findUnique({
          where: { emailAddress: canonicalData.emailAddress },
        });
        if (existing) {
          await this.prisma.lead.update({
            where: { id: existing.id },
            data: { ...canonicalData, leadSourceId },
          });
          updatedCount++;
        } else {
          await this.prisma.lead.create({
            data: {
              ...canonicalData,
              userId,
              leadSourceId,
            },
          });
          createdCount++;
        }
      } catch (error) {
        skippedCount++;
        errors.push({ rowIndex: i, reason: error.message });
      }
    }

    return { createdCount, updatedCount, skippedCount, errors };
  }

  /**
   * List user's leads with pagination
   */
  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ leads: Lead[]; total: number }> {
    const skip = (page - 1) * limit;
    const [leads, total] = await Promise.all([
      this.prisma.lead.findMany({
        where: { userId },
        skip,
        take: limit,
        include: { leadSource: true },
      }),
      this.prisma.lead.count({ where: { userId } }),
    ]);
    return { leads, total };
  }

  /**
   * Find one lead
   */
  async findOne(id: string, userId: string): Promise<Lead> {
    const lead = await this.prisma.lead.findFirst({
      where: { id, userId },
      include: { leadSource: true },
    });
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }
    return lead;
  }

  /**
   * Update lead
   */
  async update(
    id: string,
    userId: string,
    updateLeadDto: UpdateLeadDto,
  ): Promise<Lead> {
    const lead = await this.findOne(id, userId);
    return this.prisma.lead.update({
      where: { id },
      data: updateLeadDto,
    });
  }

  /**
   * Delete lead
   */
  async delete(id: string, userId: string): Promise<void> {
    const lead = await this.findOne(id, userId);
    await this.prisma.lead.delete({ where: { id } });
  }

  /**
   * Bulk delete leads
   */
  async bulkDelete(userId: string, { ids }: BulkDeleteLeadsDto): Promise<void> {
    await this.prisma.lead.deleteMany({
      where: { id: { in: ids }, userId },
    });
  }
}
