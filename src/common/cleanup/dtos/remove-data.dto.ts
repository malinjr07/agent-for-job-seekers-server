import { IsString, IsNotEmpty, IsIn } from 'class-validator';

const ALLOWED_MODELS = ['User'] as const;

export class RemoveDataDto {
  @IsString()
  @IsNotEmpty({ message: 'Model name is required' })
  @IsIn(ALLOWED_MODELS, {
    message: `Model name must be one of: ${ALLOWED_MODELS.join(', ')}`,
  })
  modelName: string;
}
