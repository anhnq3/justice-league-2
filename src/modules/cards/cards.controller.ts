import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from '../helper/pagination/paginationParam';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Get all cards' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get() // http://localhost:3000/cards?skip=20&limit=10
  getAll(@Query() { page, limit }: PaginationParams) {
    return this.cardsService.getAllCard(page, limit);
  }

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Get card by Id' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getCardById(@Param('id') id: string) {
    return this.cardsService.getCardById(id);
  }

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Create a card' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  createCard(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.createCards(createCardDto);
  }

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Update a card' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put(':id')
  updateCardById(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    // return { id, updateCardDto };
    return this.cardsService.updateCard(id, updateCardDto);
  }

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Delete a card' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteCard(@Param('id') id: string) {
    return this.cardsService.deleteCard(id);
  }

  @ApiTags('Cards')
  @ApiOperation({ summary: 'Clear item in card' })
  @HttpCode(HttpStatus.OK)
  @Delete('deleteitem/:id')
  deleteItem(@Param('id') id: string) {
    return this.cardsService.deleteItem(id);
  }
}
