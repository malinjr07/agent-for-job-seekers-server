import { Expose } from 'class-transformer';

export class EmailTemplateResponseDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  name: string;

  @Expose()
  templateBody: string;

  @Expose()
  variables?: Record<string, any> | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<EmailTemplateResponseDto>) {
    Object.assign(this, partial);
  }
}
