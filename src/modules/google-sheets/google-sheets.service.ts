import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { google } from 'googleapis';
import { GoogleAuthService } from '@modules/google-auth/google-auth.service';

@Injectable()
export class GoogleSheetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  private extractSpreadsheetIdFromUrl(url: string): string {
    const match = url.match(/\/spreadsheets\/d\/(.*?)(?:\/|\?|$)/);
    if (!match || !match[1]) {
      throw new BadRequestException('Invalid Google Sheets URL');
    }
    return match[1];
  }

  async addSheetForUser(userId: string, sheetUrl: string) {
    const spreadsheetId = this.extractSpreadsheetIdFromUrl(sheetUrl);

    const authClient =
      await this.googleAuthService.getOAuthClientForUser(userId);
    const sheetsApi = google.sheets({ version: 'v4', auth: authClient });

    const spreadsheet = await sheetsApi.spreadsheets.get({
      spreadsheetId,
      includeGridData: false,
    });

    const firstSheet = spreadsheet.data.sheets?.[0];
    if (!firstSheet || !firstSheet.properties?.title) {
      throw new BadRequestException('Unable to determine primary sheet/tab');
    }

    const currentTab = firstSheet.properties.title;

    const headerValues = await sheetsApi.spreadsheets.values.get({
      spreadsheetId,
      range: `${currentTab}!1:1`,
    });

    const headersRow = headerValues.data.values?.[0] ?? [];

    const sheet = await this.prisma.googleSheet.create({
      data: {
        userId,
        sheetUrl,
        sheetId: spreadsheetId,
        currentTab,
      },
    });

    await this.prisma.header.create({
      data: {
        googleSheetId: sheet.id,
        tabName: currentTab,
        headers: headersRow,
      },
    });

    return {
      sheet_id: sheet.id,
      headers: headersRow,
    };
  }

  async getHeadersForSheet(id: string) {
    const sheet = await this.prisma.googleSheet.findUnique({ where: { id } });

    if (!sheet) {
      throw new NotFoundException('Sheet not found');
    }

    const header = await this.prisma.header.findFirst({
      where: {
        googleSheetId: sheet.id,
        tabName: sheet.currentTab,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      headers: (header?.headers as string[] | null) ?? [],
    };
  }

  async refreshHeadersForSheet(id: string) {
    const sheet = await this.prisma.googleSheet.findUnique({ where: { id } });

    if (!sheet) {
      throw new NotFoundException('Sheet not found');
    }

    const authClient = await this.googleAuthService.getOAuthClientForUser(
      sheet.userId,
    );
    const sheetsApi = google.sheets({ version: 'v4', auth: authClient });

    const headerValues = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: sheet.sheetId,
      range: `${sheet.currentTab}!1:1`,
    });

    const headersRow = headerValues.data.values?.[0] ?? [];

    const existing = await this.prisma.header.findFirst({
      where: {
        googleSheetId: sheet.id,
        tabName: sheet.currentTab,
      },
    });

    if (existing) {
      await this.prisma.header.update({
        where: { id: existing.id },
        data: { headers: headersRow },
      });
    } else {
      await this.prisma.header.create({
        data: {
          googleSheetId: sheet.id,
          tabName: sheet.currentTab,
          headers: headersRow,
        },
      });
    }

    return {
      headers: headersRow,
    };
  }
}
