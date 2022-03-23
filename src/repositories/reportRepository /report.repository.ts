import { PrismaService } from "../../configs/prisma.service"
import { Injectable } from "@nestjs/common"
import Report from "../../entities/report.entity"
import IReportRepository from "./report.repository.contract"
import { Page, PageResponse } from "src/utils/page.model"
import { Pageable } from "src/services/pageable.service"

@Injectable()
export default class ReportRepository extends Pageable<Report> implements IReportRepository {
    constructor(
        private readonly repository: PrismaService
    ) { super() }

    async create(create: Report): Promise<Report> {
        return await this.repository.report.create({
            data: {
                close: create.close,
                date: create.date,
                high: create.high,
                low: create.low,
                open: create.open,
                volume: create.volume,
                status: create?.status,
                createdAt: create.createdAt
            }
        })
    }

    delete(id: number): Promise<any> {
        return this.repository.report.delete({ where: { id } })
    }

    async findMany(page: Page): Promise<PageResponse<Report>> {
        const items = await this.repository.report.findMany({
            ...this.buildPage(page),
            orderBy: { id: 'asc' }
        })

        const total = items.length

        return this.buildPageResponse(items, total)
    }

    async findManyWithoutPagination(): Promise<Report[]> {
        return await this.repository.report.findMany()
    }

    findOne(id: number): Promise<undefined | Report> {
        return this.repository.report.findUnique({ where: { id } })
    }

    update(update: Report): Promise<Report> {
        return this.repository.report.update({
            where: { id: update.id }, data: {
                close: update.close,
                date: update.date,
                high: update.high,
                low: update.low,
                open: update.open,
                volume: update.volume,
                status: update?.status,
                updatedAt: new Date()
            },
        })
    }
}
