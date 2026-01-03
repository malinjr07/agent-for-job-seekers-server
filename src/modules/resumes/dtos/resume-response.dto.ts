import { Expose, Type } from 'class-transformer';

export class ResumeSectionResponseDto {
  @Expose()
  id: string;

  @Expose()
  sectionType: string;

  @Expose()
  content: Record<string, any>;

  @Expose()
  orderIndex: number;
}

export class ResumeResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  name: string;

  @Expose()
  htmlContent: string;

  @Expose()
  pdfPath: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => ResumeSectionResponseDto)
  sections: ResumeSectionResponseDto[];

  constructor(partial: Partial<ResumeResponseDto>) {
    Object.assign(this, partial);
  }
}
