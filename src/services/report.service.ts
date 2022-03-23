import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { UpdateReportDTO } from "../dtos/report/updateReport.dto"
import { CreateReportDTO } from "../dtos/report/createReport.dto"
import Report from "../entities/report.entity"
import IReportRepository from "../repositories/reportRepository /report.repository.contract"
import { EReportStatus } from "../utils/ETypes"
import * as stream from "stream"
import * as readline from "readline"
import FileReportDTO from "src/repositories/reportRepository /fileReport.dto"
import { Page, PageResponse } from "src/utils/page.model"

@Injectable()
export default class ReportService {
    constructor(
        @Inject('IReportRepository')
        private readonly reportRepository: IReportRepository
    ) {}

    async create(reportProps: FileReportDTO): Promise<any> {
        const reports: Report[] = []

        const readableFile = new stream.Readable()
        
        readableFile.push(reportProps.buffer)
        readableFile.push(null)

        const reportLines = readline.createInterface({
            input: readableFile,
        })

        for await (const line of reportLines) {
            const reportLineSplit = line.split(',')

            reports.push(new Report({
                date: reportLineSplit.at(0),
                open: parseFloat(reportLineSplit.at(1).replace('"', "")),
                high: parseFloat(reportLineSplit[2].replace('"', "")),
                low: parseFloat(reportLineSplit[3].replace('"', "")),
                close: parseFloat(reportLineSplit[4].replace('"', "")),
                volume: parseFloat(reportLineSplit[5].replace('"', ""))
            }))
        }

        reports.shift()

        return await Promise.all(reports.map(async report => await this.reportRepository.create(report)))
    }

    async delete(id: number) {
        return await this.reportRepository.delete(id)
    }

    async findMany(page: Page): Promise<PageResponse<Report>> {
        return await this.reportRepository.findMany(page)
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
