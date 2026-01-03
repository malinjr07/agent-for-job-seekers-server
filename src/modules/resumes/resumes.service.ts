import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateResumeDto } from './dtos/create-resume.dto';
import { UpdateResumeDto } from './dtos/update-resume.dto';
import { ResumeResponseDto } from './dtos/resume-response.dto';

@Injectable()
export class ResumesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    dto: CreateResumeDto,
  ): Promise<ResumeResponseDto> {
    const resume = await this.prisma.resume.create({
      data: {
        userId,
        name: dto.name,
        htmlContent: dto.htmlContent,
        sections:
          dto.sections && dto.sections.length > 0
            ? {
                create: dto.sections.map((section) => ({
                  sectionType: section.sectionType,
                  content: section.content,
                  orderIndex: section.orderIndex,
                })),
              }
            : undefined,
      },
      include: { sections: true },
    });

    return plainToInstance(ResumeResponseDto, resume, {
      excludeExtraneousValues: true,
    });
  }

  async findAllForUser(userId: string): Promise<ResumeResponseDto[]> {
    const resumes = await this.prisma.resume.findMany({
      where: { userId },
      include: { sections: true },
      orderBy: { createdAt: 'desc' },
    });

    return resumes.map((resume) =>
      plainToInstance(ResumeResponseDto, resume, {
        excludeExtraneousValues: true,
      }),
    );
  }

  private async ensureOwnedResume(id: string, userId: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
      include: { sections: true },
    });

    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    if (resume.userId !== userId) {
      throw new ForbiddenException('You do not have access to this resume');
    }

    return resume;
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateResumeDto,
  ): Promise<ResumeResponseDto> {
    await this.ensureOwnedResume(id, userId);

    const updateData: Record<string, any> = {};

    if (dto.name) {
      updateData.name = dto.name;
    }

    if (dto.htmlContent) {
      updateData.htmlContent = dto.htmlContent;
    }

    const operations: any[] = [];

    if (dto.sections) {
      operations.push(
        this.prisma.resumeSection.deleteMany({ where: { resumeId: id } }),
      );

      if (dto.sections.length > 0) {
        operations.push(
          this.prisma.resumeSection.createMany({
            data: dto.sections.map((section) => ({
              resumeId: id,
              sectionType: section.sectionType,
              content: section.content,
              orderIndex: section.orderIndex,
            })),
          }),
        );
      }
    }

    if (Object.keys(updateData).length > 0) {
      operations.unshift(
        this.prisma.resume.update({ where: { id }, data: updateData }),
      );
    }

    if (operations.length > 0) {
      await this.prisma.$transaction(operations);
    }

    const updated = await this.prisma.resume.findUnique({
      where: { id },
      include: { sections: true },
    });

    if (!updated) {
      throw new NotFoundException(
        `Resume with ID ${id} not found after update`,
      );
    }

    return plainToInstance(ResumeResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async generatePdf(id: string, userId: string): Promise<{ pdf_url: string }> {
    const resume = await this.ensureOwnedResume(id, userId);

    // Launch Puppeteer and generate PDF from HTML content
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(resume.htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    // Upload PDF to S3
    const bucketName = process.env.S3_BUCKET_NAME;
    const key = `resumes/${id}.pdf`;

    const uploadCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
      ACL: 'private', // Adjust ACL as needed
    });

    await this.s3Client.send(uploadCommand);

    const pdfUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    // Update resume with the S3 URL
    await this.prisma.resume.update({
      where: { id },
      data: { pdfPath: pdfUrl },
    });

    return { pdf_url: pdfUrl };
  }
}
