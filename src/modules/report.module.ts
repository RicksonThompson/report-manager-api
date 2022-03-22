import { Module } from "@nestjs/common"
import ReportController from "../controllers/report.controller"
import ReportRepository from "../repositories/reportRepository /report.repository"
import ReportService from "../services/report.service"

@Module({
    controllers: [ReportController],
    providers: [
        ReportService,
        {
            provide: 'IReportRepository',
            useClass: ReportRepository
        }
    ],
    exports: [ReportService]
})

export class ReportModule {}
