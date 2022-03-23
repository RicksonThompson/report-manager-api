import { PrismaService } from "../../configs/prisma.service"
import { Injectable } from "@nestjs/common"
import IStockPolicyRepository from "./stockPolicy.repository.contract"
import StockPolicy from "../../entities/stockPolicy.entity"

@Injectable()
export default class StockPolicyRepository implements IStockPolicyRepository {
    constructor(
        private readonly repository: PrismaService
    ) {}

    async create(create: StockPolicy): Promise<StockPolicy> {
        return await this.repository.stockPolicy.create({
            data: {
                critical: create.critical,
                excellent: create.excellent,
                good: create.good,
                createdAt: create.createdAt
            }
        })
    }

    delete(id: number): Promise<any> {
        return this.repository.stockPolicy.delete({ where: { id } })
    }

    findOne(): Promise<undefined | StockPolicy> {
        return this.repository.stockPolicy.findFirst()
    }

    update(update: StockPolicy): Promise<StockPolicy> {
        return this.repository.stockPolicy.update({
            where: { id: update.id }, data: {
                critical: update?.critical,
                excellent: update?.excellent,
                good: update?.good,
                updatedAt: new Date()
            },
        })
    }
}
