import { forwardRef, Module } from "@nestjs/common"
import ReportController from "../controllers/report.controller"
import ReportRepository from "../repositories/reportRepository /report.repository"
import ReportService from "../services/report.service"
import { StockPolicyModule } from "./stockPolicy.module"

@Module({
    imports: [ forwardRef(() => StockPolicyModule) ],
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
