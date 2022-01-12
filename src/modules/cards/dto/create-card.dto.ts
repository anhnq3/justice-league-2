import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    example: 'batman',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'link',
    required: true,
    format: 'string',
  })
  @IsString()
  readonly image: string;

  @ApiProperty({
    example: 'male',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly sex: string;

  @ApiProperty({
    example: 'batman real name',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly realName: string;

  @ApiProperty({
    example: 'dark',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly joinedIn: string;

  @ApiProperty({
    example: 10,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly attack: number;

  @ApiProperty({
    example: 5,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly defence: number;

  @ApiProperty({
    example: 7,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly agile: number;

  @ApiProperty({
    example: 8,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly lucky: number;

  @IsArray()
  @IsOptional()
  readonly items: string[];
}
