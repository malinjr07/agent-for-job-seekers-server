import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class CleanupService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Remove data from a model/table where status is 'DELETED'
   * and statusUpdatedAt is older than 90 days
   */
  async removeDeletedData(modelName: string): Promise<{
    modelName: string;
    deletedCount: number;
    message: string;
  }> {
    // Calculate the date 90 days ago
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    // Get the Prisma model dynamically
    const model = (this.prisma as any)[modelName.toLowerCase()];

    if (!model) {
      throw new BadRequestException(`Model ${modelName} not found`);
    }

    try {
      // Delete records with status 'DELETED' and statusUpdatedAt older than 90 days
      const result = await model.deleteMany({
        where: {
          status: 'DELETED',
          statusUpdatedAt: {
            lt: ninetyDaysAgo,
          },
        },
      });

      return {
        modelName,
        deletedCount: result.count,
        message: `Successfully deleted ${result.count} record(s) from ${modelName}`,
      };
    } catch (error) {
      throw new BadRequestException(
        `Error deleting data from ${modelName}: ${error.message}`,
      );
    }
  }
}
