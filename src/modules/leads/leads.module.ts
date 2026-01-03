import { Module } from '@nestjs/common';
import { LeadsController } from './controllers/leads.controller';
import { LeadsService } from './services/leads.service';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
