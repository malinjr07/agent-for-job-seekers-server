import {
  NotAcceptableException,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';

export const validationExceptionFactory = (errors: ValidationError[]) => {
  const result = errors.map((error) => ({
    property: error.property,
    message: error.constraints?.[Object.keys(error.constraints)[0]],
  }));

  const hasEmptyError = errors.some((error) => error.constraints?.isNotEmpty);

  if (hasEmptyError) {
    const nonAcceptable = new NotAcceptableException(result);

    return nonAcceptable;
  }

  // Return 400 (default) or change to 422
  return new UnprocessableEntityException(result);
};
