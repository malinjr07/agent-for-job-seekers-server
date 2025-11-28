import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { RemoveDataDto } from './dtos/remove-data.dto';

@Controller('remove')
export class CleanupController {
  constructor(private readonly cleanupService: CleanupService) {}

  /**
   * Remove deleted data older than 90 days from specified model
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async removeDeletedData(@Body() body: RemoveDataDto) {
    return this.cleanupService.removeDeletedData(body.modelName);
  }
}
