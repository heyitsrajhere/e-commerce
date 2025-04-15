import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from 'src/db/entity/products.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Products) private repo:Repository<Products>){}
    create (dto: CreateProductDto){
        const product = this.repo.create(dto)
        return this.repo.save(product)
    }
    findall(){
        return this.repo.find()
    }
}
