import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDTO } from './dto/create-promotion.dto';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDTO) {
    // TODO: capture error from service
    return this.promotionService.create(createPromotionDto);
  }

  @Get()
  findAll() {
    return this.promotionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.promotionService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.promotionService.remove(id);
  }
}
