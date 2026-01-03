import {
  IsEnum,
  IsArray,
  IsObject,
  ValidateNested,
  IsUUID,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SourceType } from '@prisma/generated';

export class BulkCreateLeadDto {
  @IsEnum(SourceType)
  source: SourceType;

  @IsUUID()
  leadSourceId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLeadItemDto)
  leads: CreateLeadItemDto[];

  @IsObject()
  requiredFieldMapping: { email: string; companyName: string };
}

export class CreateLeadItemDto {
  @IsObject()
  data: Record<string, any>;
}
