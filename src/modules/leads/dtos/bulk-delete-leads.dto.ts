import { IsArray, IsUUID } from 'class-validator';

export class BulkDeleteLeadsDto {
  @IsArray()
  @IsUUID(undefined, { each: true })
  ids: string[];
}
