import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LeadsService } from '../services/leads.service';
import { CreateLeadDto } from '../dtos/create-lead.dto';
import { BulkCreateLeadDto } from '../dtos/bulk-create-lead.dto';
import { UpdateLeadDto } from '../dtos/update-lead.dto';
import { BulkDeleteLeadsDto } from '../dtos/bulk-delete-leads.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  /**
   * Add or update a single lead
   */
  @Post()
  async create(@Request() req, @Body() body: CreateLeadDto) {
    const userId = req.user.sub;
    return this.leadsService.create(userId, body);
  }

  /**
   * Bulk create or update leads
   */
  @Post('bulk')
  async bulkCreate(@Request() req, @Body() body: BulkCreateLeadDto) {
    const userId = req.user.sub;
    return this.leadsService.bulkCreate(userId, body);
  }

  /**
   * List user's leads
   */
  @Get()
  async findAll(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = req.user.sub;
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.leadsService.findAll(userId, pageNum, limitNum);
  }

  /**
   * Update lead
   */
  @Put('single/:id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: UpdateLeadDto,
  ) {
    const userId = req.user.sub;
    return this.leadsService.update(id, userId, body);
  }

  /**
   * Delete lead
   */
  @Delete('single/:id')
  async delete(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;
    await this.leadsService.delete(id, userId);
    return { message: 'Lead deleted' };
  }

  /**
   * Bulk delete leads
   */
  @Delete('bulk')
  async bulkDelete(@Request() req, @Body() body: BulkDeleteLeadsDto) {
    const userId = req.user.sub;
    await this.leadsService.bulkDelete(userId, body);
    return { message: 'Leads deleted' };
  }
}
