import { IsNumber, IsOptional } from "class-validator"

export class UpdateStockPolicyDTO {
  @IsNumber()
  @IsOptional()
  critical?: number

  @IsNumber()
  @IsOptional()
  good?: number

  @IsNumber()
  @IsOptional()
  excellent?: number
}
