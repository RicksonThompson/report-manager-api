import { Module } from "@nestjs/common"
import StockPolicyController from "../controllers/stockPolicy.controller"
import StockPolicyRepository from "../repositories/stockPolicyRepository/stockPolicy.repository"
import StockPolicyService from "../services/stockPolicy.service"

@Module({
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
