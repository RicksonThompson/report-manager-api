import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateStockPolicyDTO {
  @IsNumber()
  @IsNotEmpty()
  critical: number

  @IsNumber()
  @IsNotEmpty()
  good: number

  @IsNumber()
  @IsNotEmpty()
  excellent: number
}
