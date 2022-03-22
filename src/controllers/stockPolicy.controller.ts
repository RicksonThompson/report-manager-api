import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common"
import { CreateStockPolicyDTO } from "../dtos/stockPolicy/createStockPolicy.dto"
import StockPolicy from "../entities/stockPolicy.entity"
import StockPolicyService from "../services/stockPolicy.service"
import { UpdateReportDTO } from "../dtos/report/updateReport.dto"

@Controller('/api/stockPolicies')
export default class StockPolicyController {
  constructor(
    private readonly stockPolicyService: StockPolicyService
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() payload: CreateStockPolicyDTO): Promise<StockPolicy> {
    return await this.stockPolicyService.create(payload)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.stockPolicyService.delete(parseInt(id))
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<StockPolicy> {
    return await this.stockPolicyService.findOne(parseInt(id))
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() payload: UpdateReportDTO): Promise<StockPolicy> {
    return await this.stockPolicyService.update(payload, parseInt(id))
  }
}
