import StockPolicy from "../../entities/stockPolicy.entity"

export default interface IStockPolicyRepository {
    create(create: StockPolicy): Promise<StockPolicy>
    delete(id: number): Promise<any>
    findOne(id: number): Promise<undefined | StockPolicy>
    update(update: StockPolicy): Promise<StockPolicy>
}
