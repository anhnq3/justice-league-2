import { IsNumber, Min, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationParams {
  @ApiProperty({
    example: 1,
    required: true,
    format: 'number',
  })
  @IsOptional()
  @Type(() => Number)
  // @IsNumber()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({
    example: 1,
    required: true,
    format: 'number',
  })
  @IsOptional()
  @Type(() => Number)
  // @IsNumber()
  @IsInt()
  @Min(1)
  limit?: number;
}
