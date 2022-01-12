import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStoreDto {
  @ApiProperty({
    example: 'hat',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsOptional()
  readonly itemName?: string;

  @ApiProperty({
    example: 10,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  readonly itemQuantity?: number;

  @ApiProperty({
    example: 3,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  readonly itemDefaultQuantity?: number;

  @ApiProperty({
    example: 10,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  readonly attack?: number;

  @ApiProperty({
    example: 10,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  readonly defence?: number;

  @ApiProperty({
    example: 10,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  readonly agile?: number;

  @ApiProperty({
    example: 10,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  readonly lucky?: number;
}
