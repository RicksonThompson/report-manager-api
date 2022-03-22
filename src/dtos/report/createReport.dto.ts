import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReportDTO {
  @IsString()
  @IsNotEmpty()
  date: string

  @IsNumber()
  @IsNotEmpty()
  open: number

  @IsNumber()
  @IsNotEmpty()
  high: number

  @IsNumber()
  @IsNotEmpty()
  low: number

  @IsNumber()
  @IsNotEmpty()
  close: number

  @IsNumber()
  @IsNotEmpty()
  volume: number
}
