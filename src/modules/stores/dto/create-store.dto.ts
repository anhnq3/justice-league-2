import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({
    example: 'hat',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly itemName: string;

  @ApiProperty({
    example: 10,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly itemQuantity: number;
  // readonly itemDefaultQuantity: number;

  @ApiProperty({
    example: 2,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly attack: number;

  @ApiProperty({
    example: 3,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly defence: number;

  @ApiProperty({
    example: 2,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly agile: number;

  @ApiProperty({
    example: 10,
    required: true,
    format: 'string',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly lucky: number;
}
