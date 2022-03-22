import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common"
import { CreateReportDTO } from "../dtos/report/createReport.dto"
import { UpdateReportDTO } from "../dtos/report/updateReport.dto"
import Report from "../entities/report.entity"
import ReportService from "../services/report.service"

@Controller('/api/reports')
export default class ReportController {
  constructor(
    private readonly reportService: ReportService
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() payload: CreateReportDTO): Promise<Report> {
    return await this.reportService.create(payload)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.reportService.delete(parseInt(id))
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMany(): Promise<Report[]> {
    return await this.reportService.findMany()
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Report> {
    return await this.reportService.findOne(parseInt(id))
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() payload: UpdateReportDTO): Promise<Report> {
    return await this.reportService.update(payload, parseInt(id))
  }
}
