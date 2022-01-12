import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @ApiProperty({
    example: '["39OBhyHa9RCRbmFgFc72"]',
    required: true,
    format: 'array',
  })
  items?: string[];
}
