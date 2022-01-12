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
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}
  @ApiTags('Stores')
  @ApiOperation({ summary: 'Get all item' })
  @HttpCode(HttpStatus.OK)
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getAllStores(@Query() { page, limit }: PaginationParams) {
    return this.storesService.getAllStores(page, limit);
  }

  @ApiTags('Stores')
  @ApiOperation({ summary: 'Get all cards with stores id' })
  @HttpCode(HttpStatus.OK)
  @Get('/cards')
  getCardsByStores() {
    return this.storesService.getCardsByStores();
  }

  @ApiTags('Stores')
  @ApiOperation({ summary: 'Get item by store id' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getStoreById(@Param('id') id: string) {
    return this.storesService.getStoreById(id);
  }

  @ApiTags('Stores')
  @ApiOperation({ summary: 'Create an item' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.createStore(createStoreDto);
  }

  @ApiTags('Stores')
  @ApiOperation({ summary: 'Update an Item' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put(':id')
  updateStoreById(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    // updateStoreById(@Param('id') id: string, updateStoreDto: UpdateStoreDto) {
    return this.storesService.updateStoreById(id, updateStoreDto);
  }

  @ApiTags('Stores')
  @ApiOperation({ summary: 'Delete an Item' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.storesService.deleteStoreByID(id);
  }
}
