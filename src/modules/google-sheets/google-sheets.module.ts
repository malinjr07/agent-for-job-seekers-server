import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { GoogleSheetsController } from './google-sheets.controller';
import { GoogleSheetsService } from './google-sheets.service';
import { GoogleAuthModule } from '@modules/google-auth/google-auth.module';

@Module({
  imports: [PrismaModule, GoogleAuthModule],
  controllers: [GoogleSheetsController],
  providers: [GoogleSheetsService],
})
export class GoogleSheetsModule {}
