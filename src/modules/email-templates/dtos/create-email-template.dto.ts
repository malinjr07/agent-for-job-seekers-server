import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEmailTemplateDto {
  @IsUUID()
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'Template name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Template body is required' })
  templateBody: string;

  @IsOptional()
  variables?: Record<string, any>;
}
