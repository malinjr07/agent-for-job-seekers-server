import { UserResponseDto } from './user-response.dto';

export class PaginatedUsersResponseDto {
  data: UserResponseDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };

  constructor(
    data: UserResponseDto[],
    total: number,
    page: number,
    limit: number,
  ) {
    this.data = data;
    this.meta = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
