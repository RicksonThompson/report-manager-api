import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import FileReportDTO from "../repositories/reportRepository /fileReport.dto"
import { UpdateReportDTO } from "../dtos/report/updateReport.dto"
import Report from "../entities/report.entity"
import ReportService from "../services/report.service"
import { Page, PageResponse } from "../utils/page.model"

@Controller('/api/reports')
export default class ReportController {
  constructor(
    private readonly reportService: ReportService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  async create(@UploadedFile('file') file: any): Promise<Report[]> {
    return await this.reportService.create(file)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.reportService.delete(parseInt(id))
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMany(@Query() page: Page): Promise<PageResponse<Report>> {
    return await this.reportService.findMany(page)
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
