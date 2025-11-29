import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CleanupModule } from './common/cleanup/cleanup.module';
import { EmailTemplatesModule } from './modules/email-templates/email-templates.module';
import { GoogleAuthModule } from './modules/google-auth/google-auth.module';
import { GoogleSheetsModule } from './modules/google-sheets/google-sheets.module';

@Module({
  imports: [
    UsersModule,
    CleanupModule,
    EmailTemplatesModule,
    GoogleAuthModule,
    GoogleSheetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
