import { PartialType } from '@nestjs/mapped-types';
import { CreateLeadDataDto } from './create-lead.dto';

export class UpdateLeadDto extends PartialType(CreateLeadDataDto) {}
