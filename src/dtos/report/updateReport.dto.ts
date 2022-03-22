import { IsDate, IsNumber, IsOptional } from "class-validator"

export class UpdateReportDTO {
  @IsDate()
  @IsOptional()
  date?: Date

  @IsNumber()
  @IsOptional()
  open?: number

  @IsNumber()
  @IsOptional()
  high?: number

  @IsNumber()
  @IsOptional()
  low?: number

  @IsNumber()
  @IsOptional()
  close?: number

  @IsNumber()
  @IsOptional()
  volume?: number
}
