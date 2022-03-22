import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { UpdateReportDTO } from "../dtos/report/updateReport.dto"
import { CreateReportDTO } from "../dtos/report/createReport.dto"
import Report from "../entities/report.entity"
import IReportRepository from "../repositories/reportRepository /report.repository.contract"
import { EReportStatus } from "../utils/ETypes"

@Injectable()
export default class ReportService {
    constructor(
        @Inject('IReportRepository')
        private readonly reportRepository: IReportRepository
    ) {}

    async create(data: CreateReportDTO): Promise<Report> {
        const report = new Report(data, EReportStatus.CRITICAL)

        return await this.reportRepository.create(report)
    }

    async delete(id: number) {
        return await this.reportRepository.delete(id)
    }

    async findMany(): Promise<Report[]> {
        return await this.reportRepository.findMany()
    }

    async findOne(id: number): Promise<Report> {
        const report = await this.reportRepository.findOne(id)

        if (!report) throw new HttpException('report not found', HttpStatus.NOT_FOUND)

        return report
    }

    async update(data: UpdateReportDTO, id: number): Promise<Report> {
        const report = await this.reportRepository.findOne(id)

        if (!report) throw new HttpException('report not found', HttpStatus.NOT_FOUND)

        Object.assign(report, data)

        return await this.reportRepository.update(report)
    }
}
