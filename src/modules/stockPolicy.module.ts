import { forwardRef, Module } from "@nestjs/common"
import StockPolicyController from "../controllers/stockPolicy.controller"
import StockPolicyRepository from "../repositories/stockPolicyRepository/stockPolicy.repository"
import StockPolicyService from "../services/stockPolicy.service"
import { ReportModule } from "./report.module"

@Module({
  imports: [forwardRef(() => ReportModule)],
  controllers: [StockPolicyController],
  providers: [
    StockPolicyService,
    {
      provide: 'IStockPolicyRepository',
      useClass: StockPolicyRepository
    }
  ],
  exports: [StockPolicyService]
})

export class StockPolicyModule {}
