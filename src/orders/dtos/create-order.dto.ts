import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class OrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  orderId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  payment: string;

  @IsString()
  @IsNotEmpty()
  delivery: string;
}
