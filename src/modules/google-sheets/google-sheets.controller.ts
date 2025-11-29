import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { CreateGoogleSheetDto } from './dtos/create-google-sheet.dto';

@Controller('sheets')
export class GoogleSheetsController {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addSheet(
    @Query('userId') userId: string,
    @Body() body: CreateGoogleSheetDto,
  ) {
    return this.googleSheetsService.addSheetForUser(userId, body.sheetUrl);
  }

  @Get(':id/headers')
  async getHeaders(@Param('id') id: string) {
    return this.googleSheetsService.getHeadersForSheet(id);
  }

  @Put(':id/refresh')
  async refresh(@Param('id') id: string) {
    return this.googleSheetsService.refreshHeadersForSheet(id);
  }
}
