import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { UpdateReportDTO } from "../dtos/report/updateReport.dto"
import IStockPolicyRepository from "../repositories/stockPolicyRepository/stockPolicy.repository.contract"
import StockPolicy from "../entities/stockPolicy.entity"
import { CreateStockPolicyDTO } from "../dtos/stockPolicy/createStockPolicy.dto"

@Injectable()
export default class StockPolicyService {
  constructor(
    @Inject('IStockPolicyRepository')
    private readonly reportRepository: IStockPolicyRepository
  ) {}

  async create(data: CreateStockPolicyDTO): Promise<StockPolicy> {
    const stockPolicy = new StockPolicy(data)

    return await this.reportRepository.create(stockPolicy)
  }

  async delete(id: number) {
    return await this.reportRepository.delete(id)
  }

  async findOne(id: number): Promise<StockPolicy> {
    const stockPolicy = await this.reportRepository.findOne(id)

    if (!stockPolicy) throw new HttpException('stock policy not found', HttpStatus.NOT_FOUND)

    return stockPolicy
  }

  async update(data: UpdateReportDTO, id: number): Promise<StockPolicy> {
    const stockPolicy = await this.reportRepository.findOne(id)

    if (!stockPolicy) throw new HttpException('stock policy not found', HttpStatus.NOT_FOUND)

    Object.assign(stockPolicy, data)

    return await this.reportRepository.update(stockPolicy)
  }
}
