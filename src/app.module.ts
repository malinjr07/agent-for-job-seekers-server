import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CleanupModule } from './common/cleanup/cleanup.module';

@Module({
  imports: [UsersModule, CleanupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
