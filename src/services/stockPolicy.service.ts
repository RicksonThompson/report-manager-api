import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { UpdateReportDTO } from "../dtos/report/updateReport.dto"
import IStockPolicyRepository from "../repositories/stockPolicyRepository/stockPolicy.repository.contract"
import StockPolicy from "../entities/stockPolicy.entity"
import { CreateStockPolicyDTO } from "../dtos/stockPolicy/createStockPolicy.dto"
import ReportService from "./report.service"
import Report from "../entities/report.entity"
import { EReportStatus } from "../utils/ETypes"

@Injectable()
export default class StockPolicyService {
  constructor(
    @Inject('IStockPolicyRepository')
    private readonly reportRepository: IStockPolicyRepository,
    @Inject(forwardRef(() => ReportService))
    private readonly reportService: ReportService
  ) {}

  async create(data: CreateStockPolicyDTO): Promise<StockPolicy> {
    const stockPolicy = new StockPolicy(data)

    const newStockPolicy = await this.reportRepository.create(stockPolicy)
    
    const reports = await this.reportService.findManyWithoutPagination()

    if (reports.length > 0) {
      const reportsWithStatus = await this.verifyStatus(reports, stockPolicy)
      await this.reportService.updateStatus(reportsWithStatus)
    }

    return newStockPolicy
  }

  async delete(id: number) {
    return await this.reportRepository.delete(id)
  }

  async findOne(): Promise<StockPolicy> {
    const stockPolicy = await this.reportRepository.findOne()

    if (!stockPolicy) throw new HttpException('stock policy not found', HttpStatus.NOT_FOUND)

    return stockPolicy
  }

  async find(): Promise<StockPolicy> {
    return await this.reportRepository.findOne()
  }

  async update(data: UpdateReportDTO, id: number): Promise<StockPolicy> {
    const stockPolicy = await this.reportRepository.findOne()

    if (!stockPolicy) throw new HttpException('stock policy not found', HttpStatus.NOT_FOUND)

    Object.assign(stockPolicy, data)

    const reports = await this.reportService.findManyWithoutPagination()
    
    if (reports) {
      const reportsWithStatus = await this.verifyStatus(reports, stockPolicy)

      await this.reportService.updateStatus(reportsWithStatus)
    }

    const updatedPolicy = await this.reportRepository.update(stockPolicy)

    return updatedPolicy
  }

  async verifyStatus(reports: Report[], stockPolicy: StockPolicy): Promise<Report[]> {
    const reportWithStatus = reports.map(report => {
      if (report.volume <= stockPolicy.critical) {
        report.status = EReportStatus.CRITICAL
        return report
      } else if (report.volume > stockPolicy.critical && report.volume < stockPolicy.excellent) {
        report.status = EReportStatus.GOOD
        return report
      } else if (report.volume >= stockPolicy.excellent){
        report.status = EReportStatus.EXCELLENT
        return report
      }
    })

  return reportWithStatus
  }
}
