import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDTO) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') sku: string) {
    const product = await this.productService.findOne(sku);
    if (!product) {
      throw new NotFoundException(`Product with SKU (id) ${sku} was not found`);
    }
    return product;
  }

  @Delete(':id')
  async remove(@Param('id') sku: string) {
    return await this.productService.remove(sku);
  }
}
