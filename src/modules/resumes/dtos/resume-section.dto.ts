import { IsInt, IsNotEmpty, IsObject, IsString, Min } from 'class-validator';

export class ResumeSectionDto {
  @IsString()
  @IsNotEmpty({ message: 'Section type is required' })
  sectionType: string;

  @IsObject({ message: 'Section content must be an object' })
  @IsNotEmpty({ message: 'Section content is required' })
  content: Record<string, any>;

  @IsInt()
  @Min(0)
  orderIndex: number;
}
