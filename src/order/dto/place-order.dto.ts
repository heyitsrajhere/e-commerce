import { IsNumber } from 'class-validator';

export class PlaceOrderItemDto {
  @IsNumber()
  id: number;

  @IsNumber()
  quantity: number;
}
export class PlaceOrderDto {
  @IsNumber({}, { each: true })
  items: PlaceOrderItemDto[];
}
