import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateOlaDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsNumber()
  @IsPositive()
  altura: number;
}
