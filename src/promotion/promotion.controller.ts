import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDTO } from './dto/create-promotion.dto';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  async create(@Body() createPromotionDto: CreatePromotionDTO) {
    try {
      return await this.promotionService.create(createPromotionDto);
    } catch (e: any) {
      throw new BadRequestException('Trying to create an invalid promotion', e);
    }
  }

  @Get()
  async findAll() {
    return await this.promotionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const promotion = await this.promotionService.findOne(id);
    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${id} was not found`);
    }
    return promotion;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.promotionService.remove(id);
  }
}
