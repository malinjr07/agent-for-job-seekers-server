import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleSheetDto {
  @IsString()
  @IsNotEmpty({ message: 'Sheet URL is required' })
  sheetUrl: string;
}
