import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/Guard/auth.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    @UseGuards(AuthGuard)
    @Roles('admin')
    @Post('create')
    create(@Body() body: CreateProductDto){
        return this.productService.create(body)
    }
    @Get('create')
    getAll(){
        return this.productService.findall()
    }
}
