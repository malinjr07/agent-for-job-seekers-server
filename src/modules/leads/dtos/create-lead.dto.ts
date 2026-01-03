import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateLeadDataDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsString()
  emailAddress: string;

  @IsString()
  companyName: string;

  @IsUUID()
  leadSourceId: string;
}

export class CreateLeadDto {
  data: CreateLeadDataDto;
}
